import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#121214] border border-orange-500/50 rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-orange-500 mb-4 bg-zinc-950 flex items-center justify-center">
              <img src="/icon-192.png" alt="LocoTSD" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-xl font-bold text-orange-400 mb-2">
              लोको ट्रबलशूटिंग ऐप (LocoAssist)
            </h1>
            <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
              पेज लोड होने में कुछ रुकावट आई है। कृपया नीचे दिए गए बटन पर टैप करके ऐप को पुनः लोड (Reload) करें:
            </p>
            {this.state.error?.message && (
              <pre className="text-xs bg-black/60 text-red-300 p-3 rounded-lg border border-red-900/40 mb-4 w-full overflow-x-auto text-left font-mono">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && 'caches' in window) {
                    caches.keys().then((keys) => {
                      keys.forEach((key) => caches.delete(key));
                    });
                  }
                } catch (e) {}
                window.location.reload();
              }}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold rounded-xl shadow-lg transition-all active:scale-95"
            >
              🔄 ऐप पुनः लोड करें (Reload App)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
