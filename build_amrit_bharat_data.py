import json

pages = [
    {
        "page": 1,
        "part": "PART-A: Cover & Document Information",
        "title": "Front Cover: CLW Amrit Bharat Push-Pull WAP-5 Operation & TSD Manual",
        "text": """CHITTARANJAN LOCOMOTIVE WORKS (CLW)
OPERATION MANUAL & TROUBLESHOOTING DIRECTORY FOR PUSH-PULL ENABLED AERODYNAMIC WAP-5 LOCOMOTIVES & COACHES
REVISION: FINAL COPY (APRIL 2024)

Applicable for:
- Aerodynamic WAP-5 Locomotives in Push-Pull Configuration (Master & Slave)
- Amrit Bharat Express Rake (22 Coaches: LOCO + LSRD + 4 LWS + 12 LSCN + 4 LWS + LSRD + LOCO)
- Wired Train Bus (WTB) Communication through 22-pin UIC Couplers
- Knorr CCB 2.0 / E-70 Microprocessor Controlled Brake Systems
- Hotel Load Converters (HLC) and SBC-0195 Switch Board Cabinets."""
    },
    {
        "page": 2,
        "part": "PART-A: Cover & Document Information",
        "title": "Document Index & Layout of 67-Page TSD",
        "text": """INDEX OF CLW AMRIT BHARAT PUSH-PULL MANUAL:
PART-A: Operation Manual for Push-Pull enabled Aerodynamic WAP-5 (Pages 5-14)
- Preparation and Energization of Master & Slave Loco (Pages 5-7)
- DDU Node Progression (Nodes 504, 550, 570, 590, 596) (Page 8)
- Neutral Section Negotiation with ZNN Switch (Page 9)
- Making Slave Loco Dead (Stationary & On Run) (Pages 10-11)
- Cab Changing Procedure & Operational Guidelines (Pages 12-14)

PART-B: Troubleshooting Directory for Specific Fault Codes (Pages 15-52)
- SS01: Main Power (VCB F0101P1, Catenary F0104P1, Oil F0105P1) (Pages 15-20)
- SS02 & SS03: Traction Converter 1 & 2 (F0201P1, F0301P1) (Pages 21-24)
- SS04: Harmonic Filter & 40 km/h Restriction Rule (Pages 25-26)
- SS05: Hotel Load Converter (Pages 27-29)
- SS06, SS07, SS08: Auxiliary Converter BUR 1, 2, 3 (Pages 30-35)
- SS09: Battery System & Charger MCB 100 (Pages 36-39)
- SS10: Brake System (F1001P1 to F1008P1, VCD suppression) (Pages 40-48)
- SS11 & SS12: Auxiliaries HB-1 & HB-2 (Compressors MCP 1 & 2) (Pages 49-50)
- SS15: Fire Detection Unit in Machine Room (Page 51)
- SS19: Train Bus / WTB Communication Disturbance F1901P1 (Page 52)

PAGE 53: General Push-Pull Faults - Slave Loco Brakes Not Releasing (3.5 kg/cm² BC), CE, Panto, BP, Throttle
Pages 54-60: Brake Systems in Push-Pull (E-70 & CCB 2.0)
Pages 61-67: Amrit Bharat Coaches, SBC-0195, WTB Repeaters & Couplers."""
    },
    {
        "page": 3,
        "part": "PART-A: Technical Overview",
        "title": "Abbreviations & Special Push-Pull Terminology",
        "text": """SPECIAL PUSH-PULL & AMRIT BHARAT TERMINOLOGY:
- Master Loco: Leading locomotive from which train is being driven by the Loco Pilot.
- Slave Loco: Trailing locomotive controlled remotely through WTB trainline.
- ZNN: Neutral Section Negotiation Switch on 'A' Panel (renamed from ZTEL).
- ADD BL: Additional BL Key switch on 'D' Panel of Master Loco for remote Slave Loco Control Electronics ON/OFF/Reset.
- ADD BPFA: Additional BPFA acknowledgement lamp for Slave Loco on 'D' Panel.
- ADD LSDJ: Additional LSDJ lamp indicating Slave Loco VCB condition on 'D' Panel.
- 22-pin UIC Coupler: Push-Pull train bus communication cable running through the rake (RDSO MS 477).
- WTB Repeater: Signal booster units in Coaches 6, 12, and 18, powered by 110V coach batteries.
- Self Hold Mode: State where Slave Loco electronics remain ON for 60 minutes after communication interruption.
- CCB 2.0: Computer Controlled Brake System (Lead mode in Master driving cab, Trail mode in all other cabs)."""
    },
    {
        "page": 4,
        "part": "PART-A: Technical Overview",
        "title": "WAP-5 Push-Pull Aerodynamic Locomotive Specifications",
        "text": """TECHNICAL SPECIFICATIONS OF PUSH-PULL AERODYNAMIC WAP-5:
- Total Horsepower: 2 x 5400 HP = 10,800 HP combined traction power.
- Maximum Operating Speed: 160 km/h (designed for rapid acceleration).
- Rake Configuration: 22 LHB coaches with push-pull trainline.
- Aerodynamic Cab: Specially profiled nose cone for reduced drag at high speeds.
- Neutral Section Passing: Automated sequenced opening & closing using ZNN switch.
- Redundant Control: In case of communication failure (F1901P1), Master loco can clear section independently."""
    },
    {
        "page": 5,
        "part": "PART-A: Operation Manual",
        "title": "Preparation of Slave Loco for Push-Pull Service",
        "text": """PREPARATION OF SLAVE LOCO FOR PUSH-PULL SERVICE:
1. Carry out initial inspection of Slave loco as per single loco procedure.
2. Ensure UIC jumpers for MU & HLC, and IVC jumpers for Hotel Load between loco and train are properly connected and locked.
3. Check BP & FP air pipes connected with power car and angle cocks in OPEN condition.
4. Pneumatic panel setup on Slave Loco:
   - In E-70 Brake System: Cock No. 70, 74, IG-38 key in OPEN condition. Cock 136 and Cock 47 in CLOSED condition!
   - In Knorr CCB 2.0 Brake System: Controller mode switch in 'Trail' in both driving and non-driving cabs. SIFA cock open.
5. Brake handle setup:
   - In E-70: SA-9 handle in RELEASE position in both cabs. A-9 handle removed or kept in 'Neutral'.
   - In CCB 2.0: Both cab A-9 handles in Full Service (FS) and locked; mode switch in 'Trail'. SA-9 released.
6. Electrical cubicle SB-2 setup:
   - MCB 110 (Battery Charger) in ON / SET condition.
   - MCB 112.1 (Main Control Electronics) in ON / SET condition."""
    },
    {
        "page": 6,
        "part": "PART-A: Operation Manual",
        "title": "Preparation of Master Loco for Push-Pull Service",
        "text": """PREPARATION OF MASTER LOCO FOR PUSH-PULL SERVICE:
1. Inspect Master loco as per standard single loco operating procedure.
2. Check 22-pin UIC push-pull jumpers, 13-pin HLC jumpers, and 500A IVC jumpers connected between Master loco and train.
3. Check BP and FP hoses connected, angle cocks open.
4. Pneumatic panel setup on Master Loco:
   - In E-70 Brake System: Cock No. 70, 74, and Cock 136 in OPEN condition. IG-38 key OPEN. Cock 47 CLOSED.
   - In Knorr CCB 2.0 Brake System: Controller mode switch in 'Lead' in driving cab, and 'Trail' in non-driving rear cab.
5. Electrical cubicle SB-2 setup:
   - MCB 110 (Battery Charger) in ON / SET condition.
   - MCB 112.1 (Main Control Electronics) in ON / SET condition.
6. Verify coach battery voltage in power cars/LSRD is healthy (>110V DC) for WTB repeaters."""
    },
    {
        "page": 7,
        "part": "PART-A: Operation Manual",
        "title": "Energization Sequence for Push-Pull Locomotives",
        "text": """ENERGIZATION OF LOCOMOTIVES FOR PUSH-PULL:
1. In Master driving cab, insert BL Key in ADD BL slot provided on 'D' panel (ALP side).
2. Move BL Key from 'OFF' to 'D'.
3. ADD LSDJ illuminates, indicating Slave loco control electronics are switched ON.
4. Slave loco configuration starts: ADD BPFA illuminates for a few seconds, then extinguishes.
5. Entire slave boot sequence takes approximately 35 to 45 seconds.
6. After ADD BPFA extinguishes, operate BL Key from 'D' to 'OFF' in ADD BL slot and remove it.
7. Insert the BL Key into Master Loco main BL slot (on 'A' Panel) in 'OFF' position and move to 'D'.
8. Master loco control electronics boot up.
9. On Slave loco DDU, 'self hold mode active' message appears."""
    },
    {
        "page": 8,
        "part": "PART-A: Operation Manual",
        "title": "DDU Progression & Node Sequence (504, 550, 570, 590, 596)",
        "text": """DDU NODE PROGRESSION IN PUSH-PULL:
- Node 504: When both locos finish initial configuration, Master DDU displays 'Node 504' and Slave status 'Slv: 504'. This confirms both locos are ready to raise pantograph! (In Medha: Main menu -> process information -> node information).
- Node 550: Press ZPT switch on Master loco to raise pantograph. Both Master & Slave pantographs raise. Master DDU displays Node 550 and Slv: 550.
- Node 570: Press BLDJ on Master loco. Both locos VCB close simultaneously, auxiliaries start functioning. Master DDU displays Node 570 and Slv: 570.
- Test Brakes: Create MR pressure (minimum 6.4 kg/cm²) & BP (5.0 kg/cm²). Test SA-9 and A-9.
- Node 590: Move Reverser (MPJ) to Forward 'F' or Reverse 'R'. Master DDU displays Node 590 and Slv: 590.
- Node 596: Press BPPB to release parking brake. Move throttle to Traction. Master DDU displays Node 596 and Slv: 596. Both Master and Slave locomotives are on power!"""
    },
    {
        "page": 9,
        "part": "PART-A: Operation Manual",
        "title": "Neutral Section Negotiation (ZNN Switch Operation)",
        "text": """PROCEDURE FOR PASSING NEUTRAL SECTION (ZNN SWITCH):
1. On 500 m warning board: Attain permissible track speed.
2. On 250 m warning board:
   - Ensure ZNN switch is kept in 'ON' position on 'A' panel of Master loco.
   - Throttle must NOT be in regenerative braking mode (keep throttle in motoring or idle).
3. On DJ OPEN board:
   - Operate BLDJ switch to 'OFF'.
   - LSDJ lamp illuminates on Master desk.
   - Master loco VCB opens immediately.
   - SLAVE LOCO VCB REMAINS CLOSED AT THIS TIME!
4. On DJ CLOSE board:
   - Bring throttle to '0' (neutral).
   - Operate BLDJ switch to 'ON'. LSDJ extinguishes on Master desk.
5. Automatic Sequenced Action for Slave Loco:
   - Slave loco VCB will open automatically approx 350 meters after Master loco VCB opened.
   - Slave loco VCB will close automatically approx 750 meters after closing Master VCB.
6. Verify on Master DDU that both locos show Node 590, then resume traction power."""
    },
    {
        "page": 10,
        "part": "PART-A: Operation Manual",
        "title": "Making Slave Loco Dead (Stationary Condition)",
        "text": """MAKING SLAVE LOCO DEAD (STATIONARY IN YARD/STATION):
1. On pneumatic panel of Slave Loco:
   - Close Cock No. 70 (BP isolating cock).
   - Close Cock No. 74 (Emergency exhaust cock).
   - OPEN Cock No. 47 (Dead loco cock) on E-70 panel.
2. In Knorr CCB 2.0:
   - Ensure brakes are released.
   - Close SIFA isolating cock.
3. Drain reservoirs:
   - Open drain cocks of MR1, MR2, and BC reservoirs to drain all air.
4. On electrical panel SB-2:
   - Switch OFF battery charger MCB 110.
   - Switch OFF main electronics MCB 112.1.
5. Manual release of parking brakes:
   - Press 'Release parking brake plunger' manually on parking brake cylinder to ensure wheels are completely free."""
    },
    {
        "page": 11,
        "part": "PART-A: Operation Manual",
        "title": "Making Slave Loco Dead (On Run in Block Section)",
        "text": """MAKING SLAVE LOCO DEAD (ON RUN IN BLOCK SECTION):
1. Note: Slave loco electronics remain in 'Self Hold Mode' for up to 100 minutes.
2. Bring train to halt at safe location or clear section within 100 minutes.
3. On Slave Loco SB-2 panel:
   - Switch OFF MCB 112.1 & MCB 110.
4. On Master Loco DDU:
   - Fault message F1901P1 'Communication Disturbance' appears 2 to 3 times.
   - Master loco VCB opens.
   - Acknowledge fault by pressing BPFA button until 'Train Bus Isolated' message appears on DDU screen.
5. Press ENTER on DDU to isolate SubSystem SS19 (Train Bus).
6. LSFI lamp illuminates continuously on Master desk.
7. Close VCB via BLDJ and work ahead hauling train with Master loco alone."""
    },
    {
        "page": 12,
        "part": "PART-A: Operation Manual",
        "title": "Changing Master Loco to Slave and Slave to Master",
        "text": """CHANGING MASTER LOCO TO SLAVE AND SLAVE TO MASTER:
On Master Loco (to become Slave):
1. Stop train safely. Apply A-9 in Emergency, SA-9 in applied position.
2. Throttle to '0', MPJ to Neutral. ZNN switch to OFF.
3. Open VCB (BLDJ OFF), lower pantograph (ZPT OFF).
4. Keep SA-9 handle in RELEASE position in both cabs to prevent brake binding!
5. Turn BL key D -> OFF -> C to shut off Master control electronics.
6. Insert BL key into ADD BL slot and turn OFF -> C to turn off Slave electronics.
7. Move A-9 to neutral, CLOSE Cock 136 (or mode 'Trail' in CCB).
On Slave Loco (to become Master):
8. OPEN Cock 136 (or mode 'Lead' in CCB driving cab).
9. Energize as Master loco following standard push-pull energization procedure."""
    },
    {
        "page": 13,
        "part": "PART-A: Operation Manual",
        "title": "Key Operational Guidelines for Push-Pull WAP-5",
        "text": """IMPORTANT OPERATIONAL GUIDELINES:
- Attaching/detaching UIC jumpers: Ensure MCBs 110 & 112.1 in SB-2 are OFF in both locos before handling jumper cables.
- In Slave loco, only 'U' voltmeter reads catenary voltage. UBA and Traction Bogie 1-2 meters do not read in slave driving cab.
- Cock 136 must strictly remain CLOSED in Slave loco (E-70 brake system).
- Slave loco faults always display on Master loco DDU with prefix 'Slv:' or slave loco number. Always verify which loco is affected!
- Slave loco VCD remains in sleep mode. If it acts mistakenly, isolate switch 237.1 (SB-1) on slave loco and inform TLC.
- WTB Repeater units in Coaches 6, 12, and 18 are powered by coach battery. Ensure healthy coach battery supply before train start."""
    },
    {
        "page": 14,
        "part": "PART-A: Operation Manual",
        "title": "DDU Screen Interpretation & Troubleshooting Rules",
        "text": """DDU DISPLAY READING & SCREEN INTERPRETATION:
- Master Loco status: Displayed with standard node codes (504, 550, 570, 590, 596).
- Slave Loco status: Displayed alongside Master status as 'Slv: 504', 'Slv: 550', 'Slv: 570', 'Slv: 590', 'Slv: 596'.
- Single Loco Mode (Train Bus Isolated): When SS19 is isolated, Slv node displays 'Slv: 0' and LSFI glows steadily.
- Fault Acknowledgment:
  * For Master faults: Press main BPFA button on desk.
  * For Slave faults: Press ADD BPFA button on 'D' panel if required.
- Priority: Clear block section first using available traction from healthy loco before detraining to inspect."""
    },
    {
        "page": 15,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS01: Main Power Subsystem Overview",
        "text": """SUBSYSTEM SS01: MAIN POWER OVERVIEW:
Covers main high-voltage circuit, pantograph, VCB (vacuum circuit breaker), catenary voltage sensing, main transformer, and oil circulation.
Major fault codes in SS01:
- F0101P1: VCB stuck in ON position.
- F0102P1: VCB stuck in OFF position.
- F0103P1: Low pressure panto / faulty panto.
- F0104P1: Catenary voltage out of limit.
- F0105P1: Transformer oil temperature or pressure not OK."""
    },
    {
        "page": 16,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0101P1: VCB STUCK IN ON POSITION (Master vs Slave)",
        "text": """Fault: F0101P1: VCB STUCK IN ON POSITION, Loco will be shut down (SS01)
If fault on Master Loco:
Effect: Panto lowers & VCB trips. LSFI flickers, LSDJ & BPFA glow. Slave loco continues working normally in push-pull.
Troubleshooting:
1. Try to clear section with help of slave loco (since slave maintains full traction).
2. After halting: Put ZNN switch OFF. Open slave VCB (BLDJ). Lower slave panto (ZPT) -> slave enters Self Hold Mode. Reset MCE of Master loco with BL key. Wait 35-40s for Node 504 on Master DDU. Energise for push-pull.
3. If unsuccessful, make Master loco dead (open cock 136) and work train with Slave loco pushing/leading.
If fault on Slave Loco:
Effect: Master panto raised, VCB open. LSFI flickers, LSDJ & BPFA glow.
Troubleshooting: Put ZNN OFF, try closing VCB by BLDJ. If unsuccessful, clear section in rolling. Switch off Master MCE. Reset Slave MCE via ADD BL key on 'D' panel (OFF->C->OFF->D) and wait 35-40s for ADD BPFA. Turn ON Master MCE, wait for Node 504 on both locos."""
    },
    {
        "page": 17,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0102P1: VCB STUCK IN OFF POSITION",
        "text": """Fault: F0102P1: VCB STUCK IN OFF POSITION (SS01)
Effect: VCB fails to close. LSDJ remains illuminated.
Troubleshooting:
1. Ensure MR pressure > 6.4 kg/cm² and pantograph reservoir pressure > 6.0 kg/cm².
2. Check battery voltage on UBA meter (must be > 86V DC).
3. Check control electronics MCB 112.1 and MCB 110 in SB-2 panel.
4. Check pneumatic panel VCB cock is open.
5. In Slave loco: Verify UIC jumper cable connection between loco and rake."""
    },
    {
        "page": 18,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0103P1: LOW PRESSURE PANTO / FAULTY PANTO",
        "text": """Fault: F0103P1: LOW PRESSURE PANTO / FAULTY PANTO (SS01)
Effect: Pantograph fails to raise, Node stays at 504.
Troubleshooting:
1. Verify Auxiliary Reservoir gauge shows > 5.2 kg/cm². If low, start MCPA from SB-2.
2. Ensure blue key IG-38 is inserted and turned to horizontal position (vertical in CCB 2.0).
3. Check cocks PAN-1 and PAN-2 on pneumatic panel are OPEN.
4. Verify Emergency Stop push button is released.
5. Check MCB 127.12 in SB-1 and Contactor 130.1 in SB-2.
6. Try raising alternate pantograph via Pantograph Selector Switch 85."""
    },
    {
        "page": 19,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0104P1: CATENARY VOLTAGE OUT OF LIMIT (Master vs Slave)",
        "text": """Fault: F0104P1: CATENARY VOLTAGE OUT OF LIMIT, Watch Catenary Voltmeter (SS01)
If fault on Master Loco:
Effect: Panto raised & VCB trips. LSFI flickers, LSDJ & BPFA glow. Slave VCB will get open.
Troubleshooting:
1. Check OHE voltmeter (normal range 17.5 kV to 29.5 kV).
2. If OHE voltage out of limit, clear section in rolling condition.
3. If OHE voltage normal, check PT fuse of Master loco. If blown, replace.
4. If Analog U-meter shows 25 kV but DDU shows 0, isolate SR1 and SR2 one by one.
5. If required, reset Master MCE (BL key D->OFF->C->OFF->D) and wait 35-40s for Node 504 on both locos.
If fault on Slave Loco:
Check PT fuse of Slave loco. Reset Slave MCE using ADD BL key on 'D' panel of Master loco."""
    },
    {
        "page": 20,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0105P1: TRANSFORMER OIL TEMPERATURE OR PRESSURE NOT OK",
        "text": """Fault: F0105P1: TRANSFORMER OIL TEMPERATURE OR PRESSURE NOT OK (SS01)
Effect on Master Loco: LSFI flickers & BPFA glows. TE/BE reduction or VCB trips. Slave VCB opens.
Troubleshooting:
1. Acknowledge message by pressing BPFA. Identify if message is from Master or Slave loco.
2. Check oil pump MCBs. If tripped, open VCB and reset MCB.
3. If MCBs not tripped, visually check TR pump gauge pressure. If pressure OK, work normally. If TR pump gauge reads 0, isolate respective SR from Rotary switch in SB-1.
4. On Slave loco: Put ZNN switch OFF on Master loco, open VCB, reset tripped MCB in Slave loco."""
    },
    {
        "page": 21,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS02: Traction Bogie 1 Overview",
        "text": """SUBSYSTEM SS02: TRACTION BOGIE 1 OVERVIEW:
Controls Traction Converter-1, traction motor blowers (TMB1), oil cooling blowers (OCB1), and traction motors 1 & 2.
Major fault code:
- F0201P1: Disturbance in Traction Converter-1.
Isolation: Rotary Switch 154 to Bogie-1 isolated position, MCB 127.1/1 in SB-1."""
    },
    {
        "page": 22,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0201P1: DISTURBANCE IN TRACTION CONVERTER-1",
        "text": """Fault: F0201P1: DISTURBANCE IN CONVERTER-1 (SS02 Bogie-1)
If on Master Loco:
Effect: VCB opens, LSFI flickers, LSDJ & BPFA glow. Slave loco continues working normally.
Troubleshooting:
1. Acknowledge fault message, try closing VCB again to clear section.
2. If persists, on halt: Open slave VCB (BLDJ) with ZNN OFF. Lower slave panto (ZPT). Reset Master MCE. Wait 35-40s for Node 504.
3. If defect persists, isolate Traction Bogie-1 via switch 154 and MCB 127.1/1 & 127.11/1 (SB-1). 50% traction available on Master loco, Push-Pull works normally!
If on Slave Loco:
Isolate Bogie-1 on Slave loco via switch 154 and MCBs in SB-1."""
    },
    {
        "page": 23,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS03: Traction Bogie 2 Overview",
        "text": """SUBSYSTEM SS03: TRACTION BOGIE 2 OVERVIEW:
Controls Traction Converter-2, traction motor blowers (TMB2), oil cooling blowers (OCB2), and traction motors 3 & 4.
Major fault code:
- F0301P1: Disturbance in Traction Converter-2.
Isolation: Rotary Switch 154 to Bogie-2 isolated position, MCB 127.1/2 in SB-2."""
    },
    {
        "page": 24,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0301P1: DISTURBANCE IN TRACTION CONVERTER-2",
        "text": """Fault: F0301P1: DISTURBANCE IN CONVERTER-2 (SS03 Bogie-2)
If on Master Loco:
Effect: VCB opens, LSFI flickers, LSDJ & BPFA glow. Slave loco continues working normally.
Troubleshooting:
1. Acknowledge fault message, try closing VCB again to clear section.
2. If persists, on halt: Open slave VCB (BLDJ) with ZNN OFF. Lower slave panto (ZPT). Reset Master MCE. Wait 35-40s for Node 504.
3. If defect persists, isolate Traction Bogie-2 via switch 154 and MCB 127.1/2 & 127.11/2 (SB-2). 50% traction available on Master loco, Push-Pull works normally!
If on Slave Loco:
Isolate Bogie-2 on Slave loco via switch 154 and MCBs in SB-2."""
    },
    {
        "page": 25,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS04: Harmonic Filter Overview",
        "text": """SUBSYSTEM SS04: HARMONIC FILTER OVERVIEW:
Filters high-frequency harmonics on the 25 kV AC catenary.
Major faults:
- F0401P1: Harmonic Filter Current Too High.
- F0402P1: Harmonic Filter Contactor Stuck."""
    },
    {
        "page": 26,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0401P1 & F0402P1: HARMONIC FILTER & 40 KMPH SPEED RESTRICTION",
        "text": """Fault: F0401P1 & F0402P1: HARMONIC FILTER DEFECTS (SS04)
Effect: VCB opens on both Master & Slave locos. LSFI flickers, LSDJ & BPFA glow.
Troubleshooting:
1. Try clearing section with available momentum.
2. Lower panto via ZPT, reset MCE via Reset pushbutton. Wait for Node 504 on both locos.
3. 40 KMPH SPEED RESTRICTION RULE:
   - If Harmonic Filter does not come into service, push-pull operates with 40 km/h speed restriction on the affected loco.
   - Above 40 km/h, traction of defective loco drops to 0 and other loco takes full traction, achieving normal speed!
4. After 1-2 sections, isolate Traction Bogie-1 via switch 154 on affected loco; harmonic filter comes into service and half TE/BE is available at normal speed."""
    },
    {
        "page": 27,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS05: Hotel Load Converter (HLC) Overview",
        "text": """SUBSYSTEM SS05: HOTEL LOAD CONVERTER (HLC) OVERVIEW:
Provides 750V / 415V 3-phase power for passenger coaches (Air conditioning, fans, lights, mobile chargers).
Couplers: 13-pin UIC coupler for control, 500A IVC for power feed.
Cabinets: SBC-0195 in LSRD coaches."""
    },
    {
        "page": 28,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0501P1: HOTEL LOAD CONVERTER-1 DISTURBANCE",
        "text": """Fault: F0501P1: HOTEL LOAD CONVERTER-1 DISTURBANCE (SS05)
Effect: HLC-1 trips, Hotel Load power interrupted on Feeder-A.
Troubleshooting:
1. Bring throttle to 0, acknowledge via BPFA.
2. Check HLC-1 MCBs in HB-1 / auxiliary panel.
3. In LSRD coach SBC-0195, switch Bus Coupler S2S12 to feed train from healthy converter.
4. If HLC-1 cannot be restarted, supply total rake from Slave loco HLC."""
    },
    {
        "page": 29,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0502P1: HOTEL LOAD CONVERTER-2 DISTURBANCE",
        "text": """Fault: F0502P1: HOTEL LOAD CONVERTER-2 DISTURBANCE (SS05)
Effect: HLC-2 trips, Hotel Load power interrupted on Feeder-B.
Troubleshooting:
1. Acknowledge fault via BPFA.
2. Check HLC-2 MCBs.
3. Check 13-pin UIC jumper connection between loco and power car.
4. Operate Bus Coupler in LSRD SBC-0195 to maintain coach power."""
    },
    {
        "page": 30,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS06: Auxiliary Converter 1 (BUR-1) Overview",
        "text": """SUBSYSTEM SS06: AUXILIARY CONVERTER BUR-1 OVERVIEW:
Supplies 415V 3-phase AC power to traction motor blowers (TMB1 & TMB2) and oil cooling blowers (OCB1 & OCB2).
MCB: 127.22/1 in SB-1."""
    },
    {
        "page": 31,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0601P1: AUXILIARY CONVERTER-1 (BUR-1) FAULT",
        "text": """Fault: F0601P1: AUXILIARY CONVERTER-1 FAULT (BUR-1) (SS06)
Effect: VCB opens on both locos, LSFI flickers, LSDJ & BPFA glow.
Troubleshooting:
1. Bring throttle to '0'. Acknowledge through BPFA.
2. Defective BUR-1 isolates automatically. Press Enter and close VCB. Train works with remaining 2 BURs.
3. After clearing block section: Check MCB 127.22/1 in SB-1.
4. If tripped: ZNN OFF, lower panto, reset MCB, perform MCE reset & try.
5. If persists, isolate BUR-1 manually (trip MCB 127.22/1) and work with BUR-2 and BUR-3."""
    },
    {
        "page": 32,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS07: Auxiliary Converter 2 (BUR-2) Overview",
        "text": """SUBSYSTEM SS07: AUXILIARY CONVERTER BUR-2 OVERVIEW:
Supplies machine room blowers (MRB1 & MRB2), transformer oil pumps, and converter cooling pumps.
MCB: 127.22/2 in SB-1 / SB-2."""
    },
    {
        "page": 33,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0701P1: AUXILIARY CONVERTER-2 (BUR-2) FAULT",
        "text": """Fault: F0701P1: AUXILIARY CONVERTER-2 FAULT (BUR-2) (SS07)
Effect: VCB opens on both locos, LSFI flickers, LSDJ & BPFA glow.
Troubleshooting:
1. Bring throttle to '0'. Acknowledge through BPFA.
2. Defective BUR-2 isolates automatically. Press Enter and close VCB. Train works with BUR-1 & BUR-3.
3. After clearing block section: Check MCB 127.22/2.
4. If tripped: ZNN OFF, lower panto, reset MCB, perform MCE reset & try."""
    },
    {
        "page": 34,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS08: Auxiliary Converter 3 (BUR-3) Overview",
        "text": """SUBSYSTEM SS08: AUXILIARY CONVERTER BUR-3 OVERVIEW:
Supplies Main Compressors (MCP-1 & MCP-2) and Battery Charger (CHBA).
MCB: 127.22/3 in SB-2."""
    },
    {
        "page": 35,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0801P1: AUXILIARY CONVERTER-3 (BUR-3) FAULT",
        "text": """Fault: F0801P1: AUXILIARY CONVERTER-3 FAULT (BUR-3) (SS08)
Effect: VCB opens on both locos, LSFI flickers, LSDJ & BPFA glow.
Troubleshooting:
1. Bring throttle to '0'. Acknowledge through BPFA.
2. Defective BUR-3 isolates automatically. Battery charger shifts to BUR-2.
3. Press Enter and close VCB. Train works with BUR-1 and BUR-2.
4. Check MCB 127.22/3 in SB-2. Reset once if tripped."""
    },
    {
        "page": 36,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS09: Battery System Overview",
        "text": """SUBSYSTEM SS09: BATTERY SYSTEM OVERVIEW:
Provides 110V DC control voltage for Control Electronics, MCPA, lighting, and DDU screens.
Key MCBs:
- MCB 100 in HB-2: Battery charger AC input.
- MCB 110 in SB-2: Battery charger DC output.
- MCB 112.1 in SB-2: Main Control Electronics power."""
    },
    {
        "page": 37,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0901P1: BATTERY VOLTAGE LOW",
        "text": """Fault: F0901P1: BATTERY VOLTAGE LOW (SS09)
Effect: BPFA glows, voltage drops below 92V.
Troubleshooting:
1. Check UBA voltmeter in driving cab.
2. Check Battery Charger MCB 100 in HB-2 and MCB 110 in SB-2.
3. If voltage drops below 86V DC, locomotive control electronics cannot function. Halt at next station and contact TLC."""
    },
    {
        "page": 38,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0902P2: BATTERY CHARGER MCB OFF",
        "text": """Fault: F0902P2: BATTERY CHARGER MCB OFF (SS09)
Effect: BPFA glows. In UBA meter, battery voltage drops by approx 5V.
Troubleshooting:
1. Acknowledge through BPFA.
2. Check battery charger MCB 100 in HB-2 panel. If tripped, open VCB and reset once.
3. Check battery charger output MCB 110 in SB-2. Reset only after switching OFF MCE.
4. If MCB 100 trips repeatedly, isolate Auxiliary Converter-3 via MCB 127.22/3 in SB-2 and work with CHBA on BUR-2."""
    },
    {
        "page": 39,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F0903P2: LOW BATTERY CHARGER CURRENT",
        "text": """Fault: F0903P2: LOW BATTERY CHARGER CURRENT (SS09)
Effect: Battery is not charging properly.
Troubleshooting:
1. Acknowledge fault via BPFA.
2. Monitor UBA meter continuously. Locomotive can work until battery voltage drops to 86V DC.
3. Contact TLC for guidance. On Slave loco, if unsuccessful make slave loco dead."""
    },
    {
        "page": 40,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS10: Brake System Subsystem Overview",
        "text": """SUBSYSTEM SS10: BRAKE SYSTEM OVERVIEW:
Controls pneumatic and microprocessor-controlled braking (CCB 2.0 or E-70), vigilance control device (VCD), parking brakes, and regenerative brakes.
Fault codes:
- F1001P1: Fault in Brake Electronics.
- F1002P1: Low Pressure MR < 6.4 kg/cm².
- F1003P1: Vigilance Emergency Brake (VCD).
- F1004P1: Wrong Configuration Brake System.
- F1005P1: Traction with Auto Brake Not Allowed.
- F1006P1: Traction with Parking Brakes Not Allowed.
- F1007P1: Regenerative Brake Failure.
- F1008P1: Emergency Stop / Shutdown."""
    },
    {
        "page": 41,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1001P1: FAULT IN BRAKE ELECTRONICS",
        "text": """Fault: F1001P1: FAULT IN BRAKE ELECTRONICS (SS10)
Effect: Brake electronics failure, emergency brakes may apply.
Troubleshooting:
1. Check MCB 127.7 & 128.1 in SB-2.
2. Reset MCB 127.7 once (do not reset 128.1) after switching OFF MCE.
3. Release parking brake through SV-30 plunger manually.
4. If unsuccessful in CCB 2.0, switch to PTDC (Pneumatic Trail Direct Control) mode."""
    },
    {
        "page": 42,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1002P1: LOW PRESSURE MR < 6.4 kg/cm²",
        "text": """Fault: F1002P1: LOW PRESSURE MR (MR < 6.4 kg/cm²) (SS10)
Effect: Low reservoir pressure, loco power reduced or cut off.
Troubleshooting:
1. Check compressors MCB 47.1/1 in HB-1 and MCB 47.1/2 in HB-2.
2. Check air dryer leakage (isolate D in/out cocks).
3. Check auto drain valve leakage under MR1 reservoir.
4. Ensure BLCP switch is in 'MAN' or 'AUTO' position."""
    },
    {
        "page": 43,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1003P1: VIGILANCE EMERGENCY BRAKE / VCD (SLAVE VCD SUPPRESSED)",
        "text": """Fault: F1003P1: VIGILANCE EMERGENCY BRAKE (VCD) (SS10)
Effect: Penalty brakes apply, BP drops to 0, traction cut off.
Troubleshooting:
1. Throttle to 0, A-9 in Emergency, SA-9 applied.
2. Wait 120s (or 32s in Knorr CCB-2).
3. Press BPVR reset button, press BPFA, recharge BP pressure to 5.0 kg/cm².
4. If defect persists, isolate VCD by turning switch 237.1 (SB-1) to '0' position.
CRITICAL PUSH-PULL NOTE:
Slave loco VCD is normally suppressed in push-pull mode! If Slave loco VCD acts mistakenly, isolate switch 237.1 on Slave loco and inform TLC."""
    },
    {
        "page": 44,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1004P1: WRONG CONFIGURATION BRAKE SYSTEM",
        "text": """Fault: F1004P1: WRONG CONFIGURATION BRAKE SYSTEM (SS10)
Effect: Brake system configuration mismatch between Master and Slave.
Troubleshooting:
1. Check Cock 70 on pneumatic panel of both locos (must be OPEN).
2. Ensure ZBAN switch is in OFF position.
3. In CCB 2.0: Ensure Master driving cab is in 'Lead' and all other cabs in 'Trail'."""
    },
    {
        "page": 45,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1005P1: TRACTION WITH AUTO BRAKE NOT ALLOWED",
        "text": """Fault: F1005P1: TRACTION WITH AUTO BRAKE NOT ALLOWED (SS10)
Effect: Throttle will not take power while auto brake is applied.
Troubleshooting:
1. Move A-9 brake handle to 'RUN' position.
2. Verify Brake Cylinder pressure BC = 0 and BP = 5.0 kg/cm².
3. If BC pressure does not drop to 0, press TP-BC test point on pneumatic panel."""
    },
    {
        "page": 46,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1006P1: TRACTION WITH PARKING BRAKES NOT ALLOWED",
        "text": """Fault: F1006P1: TRACTION WITH PARKING BRAKES NOT ALLOWED (SS10)
Effect: Traction cut off due to parking brake application.
Troubleshooting:
1. Press illuminated BPPB push button on driver desk (pressure must reach 6 kg/cm²).
2. Check Latch Solenoid valve 30 in pneumatic panel.
3. If parking brake does not release pneumatically, pull manual release rings at wheels 1, 4, 5, and 8."""
    },
    {
        "page": 47,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1007P1: REGENERATIVE BRAKE FAILURE",
        "text": """Fault: F1007P1: REGENERATIVE BRAKE FAILURE (SS10)
Effect: Electric braking not available, train must use pneumatic brakes.
Troubleshooting:
1. Bring throttle to '0', use A-9 auto brake handle.
2. Press PVEF pedal to prevent loco brake cylinder pressure rise.
3. Check 22-pin UIC cable communication between locos."""
    },
    {
        "page": 48,
        "part": "PART-B: Troubleshooting Directory",
        "title": "F1008P1: EMERGENCY STOP / SHUTDOWN",
        "text": """Fault: F1008P1: EMERGENCY STOP / SHUTDOWN (SS10)
Effect: Total shutdown and emergency brake application.
Troubleshooting:
1. Check Emergency Stop push buttons on both ALP and LP desks.
2. If pressed, reset the Emergency button by rotating clockwise in the direction of arrows.
3. Recharge BP pressure and re-energize loco."""
    },
    {
        "page": 49,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS11: Auxiliaries Cubicle HB-1 (MCP-1)",
        "text": """SUBSYSTEM SS11: AUXILIARIES CUBICLE HB-1:
- F1101P2 (MCB Tripped in Aux Cubicle-1): Check MCB 127.2/1 in SB-1 and MCBs 54.1/1 (MRB), 62.1/1, 63.1/1, 53.1/1, 59.1/1 in HB-1. ZNN OFF, open VCB, reset MCB once. If 54.1/1 trips repeatedly, contact TLC.
- F1103P2 (MCB of Main Compressor 1 Open): Check MCB 47.1/1 in HB-1. If tripped, ZNN OFF, open VCB, reset MCB. If trips again, work train with one compressor. If 47.1/1 & 47.1/2 trip alternatively, isolate BUR-3."""
    },
    {
        "page": 50,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS12: Auxiliaries Cubicle HB-2 (MCP-2)",
        "text": """SUBSYSTEM SS12: AUXILIARIES CUBICLE HB-2:
- F1201P2 (MCB Tripped in Aux Cubicle-2): Check MCB 127.2/2 in SB-2 and MCBs 54.1/2, 62.1/2, 63.1/2, 53.1/2, 59.1/2 in HB-2.
- F1202P2 (MCB of Main Compressor 2 Open): Check MCB 47.1/2 in HB-2. If tripped, reset once. Work with single compressor if needed."""
    },
    {
        "page": 51,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS15: Fire Detection Unit in Machine Room",
        "text": """SUBSYSTEM SS15: FIRE DETECTION UNIT:
Fault: F1501P1 (Fire in Machine Room)
Troubleshooting:
1. Throttle to 0, stop train immediately.
2. Open VCB, lower panto, switch OFF MCE.
3. Inspect machine room. If smoke or fire, trip battery MCB 112.1 in SB-2 and use portable fire extinguisher.
4. For large traction converter fire, open CO2 cylinder operating cock located in ALP locker.
5. If false alarm, reset fire detection unit push button in SB-2 cubicle, press BPFA."""
    },
    {
        "page": 52,
        "part": "PART-B: Troubleshooting Directory",
        "title": "SS19: Train Bus / WTB Communication Disturbance F1901P1",
        "text": """SUBSYSTEM SS19: TRAIN BUS / WTB COMMUNICATION DISTURBANCE:
Fault: F1901P1 (Communication Disturbance on Train Bus / WTB)
Master Effect: LSFI flickers, BPFA glows, VCB opens.
Slave Effect: VCB opens, Panto comes down, Control Electronics remain ON in Self Hold Mode for 60 minutes!
Troubleshooting:
1. Throttle to 0. Press BPFA -> 'TRAIN BUS ISOLATED' appears on DDU, LSFI illuminates continuously.
2. Close VCB by BLDJ and resume traction with Master loco only (Node 596, Slv: 0).
3. At next halt: check coach UIC jumpers and WTB repeater cards at coach 6, 12, 18. Switch OFF batteries (MCB 110 & 112.1) before attending jumpers."""
    },
    {
        "page": 53,
        "part": "PART-B: Troubleshooting Directory",
        "title": "Brakes Not Releasing on Master Loco & Slave Loco (BC 3.5 kg/cm²)",
        "text": """CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 53

SECTION 1: IF BRAKES NOT RELEASING ON MASTER LOCO:
1. Keep SA-9 in RELEASE position in both cabs.
2. Operate C3W valve & release the brakes.
3. Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle.
4. Close & open 94 cock.
5. Close both bogie isolating cock, after releasing brakes, open the same & try.

SECTION 2: DURING PUSH PULL FORMATION IF SLAVE LOCO BRAKES ARE NOT RELEASING & SLAVE LOCO BC GAUGE SHOWING 3.5 kg/cm2:
1. During push pull formation if slave loco brakes are not releasing & slave loco BC gauge showing 3.5 kg/cm2, then keep slave loco SA-9 in RELEASE position in both cabs, make MCE OFF in both locos, then do push pull formation as per procedure.
2. Operate C3W valve & release the brakes.
3. Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle.
4. Close & open 94 cock.
5. Close both bogie isolating cock, after releasing brakes, open the same & try.

(हिंदी अनुवाद - पृष्ठ 53):
भाग 1: मास्टर लोको में ब्रेक रिलीज न होने पर:
1. दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।
2. C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।
3. E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम होने पर TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।
4. 94 नंबर कॉक को बंद करके पुनः खोलें।
5. दोनों बोगी आइसोलेटिंग कॉक को बंद करें, ब्रेक रिलीज होने के बाद उन्हें पुनः खोलकर प्रयास करें।

भाग 2: स्लेव लोको में ब्रेक रिलीज न होने पर (BC 3.5 kg/cm²):
यदि गलती से स्लेव (Slave) लोको में SA-9 एप्लिकेशन पर है और मास्टर (Master) लोको से स्लेव लोको का MCE ऑन कर दिया है, तो स्लेव लोको के ब्रेक RELEASE (रिलीज़) नहीं होंगे। इस स्थिति में स्लेव लोको का SA-9 RELEASE करवाएँ तथा मास्टर लोको से स्लेव लोको का MCE OFF करें और पुनः ON करें, अब स्लेव लोको का ब्रेक RELEASE होना सुनिश्चित करें। (यदि अब भी रिलीज नहीं होता है तो नीचे दिए गए स्टेप्स 1 से 5 को फॉलो करें:)
स्टेप 1: Keep SA-9 in RELEASE position in both cabs. (दोनों कैब में SA-9 को RELEASE पोजीशन में रखें।)
स्टेप 2: Operate C3W valve & release the brakes. (C3W वाल्व को ऑपरेट करें और ब्रेक रिलीज करें।)
स्टेप 3: Tap on 57 & 58 D-2 relay valve provided on pneumatic panel of E-70 brake system. In case of CCB Brake system, press TP-16, TP-20, TP-BC and DV quick release handle. (E-70 ब्रेक सिस्टम के न्यूमैटिक पैनल पर दिए गए 57 एवं 58 D-2 रिले वाल्व को हल्के से टैप करें। CCB ब्रेक सिस्टम में TP-16, TP-20, TP-BC दबाएं और DV क्विक रिलीज हैंडल ऑपरेट करें।)
स्टेप 4: Close & open 94 cock. (94 नंबर कॉक को बंद करके पुनः खोलें।)
स्टेप 5: Close both bogie isolating cock, after releasing brakes, open the same & try. (दोनों बोगी आइसोलेटिंग कॉक बंद करें, ब्रेक रिलीज होने पर पुनः खोलें और प्रयास करें।)"""
    },
    {
        "page": 54,
        "part": "PART-B: Troubleshooting Directory",
        "title": "General Push-Pull Fault: Control Electronics Not Getting ON",
        "text": """GENERAL PUSH-PULL DEFECT: CONTROL ELECTRONICS NOT GETTING ON:
Master Loco:
- Check MCBs 110 & 112.1 in SB-2 cubicle.
- Try energizing from other cab.
Slave Loco:
- Verify MCBs 110 & 112.1 in SB-2 are ON on both locos.
- Check 22-pin UIC / Harting jumpers between loco and power car.
- Energize slave loco first directly from Slave 'A' panel to Node 504. Remove BL key in 'OFF' position (Node 612 appears), then energize Master loco."""
    },
    {
        "page": 55,
        "part": "PART-B: Troubleshooting Directory",
        "title": "General Push-Pull Fault: Pantograph Not Going Up",
        "text": """GENERAL PUSH-PULL DEFECT: PANTOGRAPH NOT GOING UP:
Troubleshooting:
1. Check pantograph reservoir pressure is minimum 6.0 kg/cm². If low, run auxiliary compressor MCPA.
2. Verify blue key IG-38 is in horizontal position (vertical in CCB 2.0).
3. Ensure Emergency Stop button is not pressed in either cab.
4. Check PAN-1 and PAN-2 isolating cocks are OPEN.
5. Verify MCB 127.12 in SB-1 is set and contactor 130.1 in SB-2 is energized."""
    },
    {
        "page": 56,
        "part": "PART-B: Troubleshooting Directory",
        "title": "General Push-Pull Fault: If BP Not Maintaining/Creating (Effect on Master & Slave Loco)",
        "text": """CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 56

IF BP NOT MAINTAINING/CREATING ON MASTER LOCO:

Effect on Master Loco:
• BP gauge will show ‘0’ or less BP pressure

Effect on Slave Loco:
• BP gauge will show ‘0’ or less BP pressure

Troubleshooting:
1. Ensure MR pressure above 8 kg/cm2.
2. Ensure BP angle cock in proper position & should not be leaked.
3. Check any related fault message appearing on DDU & stored in DDS, if yes then troubleshoot as per TSD. (Also ensure that Cock-70 is in closed condition, BPEMS not pressed, A-9 handle is in proper position in all cab & RS handles are in vertical position)
4. Check BP in master loco by closing BP angle cock between master loco & power car.
5. Close Slave Loco's Power car side BP angle cock & check whether BP maintaining or not, If BP maintaining, make slave loco completely dead & open BP angle cock between slave loco & power car & check BP continuity & conjunction brake test in slave loco.
6. If still BP not maintaining, Check any leakages in Train.

(हिंदी अनुवाद - पृष्ठ 56):
मास्टर लोको पर BP प्रेशर न बनने या न ठहरने पर:
मास्टर लोको पर प्रभाव: BP गेज '0' या कम BP प्रेशर दर्शाएगा।
स्लेव लोको पर प्रभाव: BP गेज '0' या कम BP प्रेशर दर्शाएगा।

दोष निवारण कार्यवाही (Troubleshooting):
1. सुनिश्चित करें कि MR प्रेशर 8 kg/cm² से अधिक हो।
2. सुनिश्चित करें कि BP एंगल कॉक सही स्थिति में हो और उसमें से लीकेज न हो।
3. DDU पर दिखने वाले तथा DDS में दर्ज संबंधित फॉल्ट संदेश की जांच करें और TSD के अनुसार निवारण करें। (यह भी सुनिश्चित करें कि कॉक-70 बंद स्थिति में हो, BPEMS दबा न हो, सभी कैब में A-9 हैंडल सही स्थिति में हो तथा RS हैंडल वर्टिकल स्थिति में हों)
4. मास्टर लोको और पावर कार के बीच BP एंगल कॉक बंद करके मास्टर लोको में BP प्रेशर की जांच करें।
5. स्लेव लोको के पावर कार साइड BP एंगल कॉक को बंद करें और देखें कि BP मेंटेन हो रहा है या नहीं। यदि BP मेंटेन हो रहा है, तो स्लेव लोको को पूरी तरह डेड करें तथा स्लेव लोको और पावर कार के बीच BP एंगल कॉक खोलें और स्लेव लोको में BP निरंतरता व कंजंक्शन ब्रेक टेस्ट करें।
6. यदि फिर भी BP मेंटेन नहीं हो रहा है, तो ट्रेन में लीकेज की जांच करें।"""
    },
    {
        "page": 57,
        "part": "PART-B: Troubleshooting Directory",
        "title": "General Push-Pull Fault: Throttle Not Responding in Traction",
        "text": """GENERAL PUSH-PULL DEFECT: THROTTLE NOT RESPONDING:
Troubleshooting:
1. Both traction bogie meters read '0'.
2. Press BPCS (constant speed) button to release speed hold.
3. Move Reverser (MPJ) Forward -> 0 -> Forward.
4. Toggle ZNN switch to OFF, open and close VCB via BLDJ."""
    },
    {
        "page": 58,
        "part": "PART-B: Troubleshooting Directory",
        "title": "General Push-Pull Fault: Hotel Load Not Coming from HLC-2/1 of Slave Loco",
        "text": """CLW AMRIT BHARAT TSD FINAL COPY - PAGE NO 58
HOTEL LOAD NOT COMING FROM HLC- 2/1 OF SLAVE LOCO:
Troubleshooting Steps:
1. Check IVC Coupler properly fitted or not. (IVC 500A कपलर ठीक से फिट है या नहीं जांचें)
2. Hotel Load UIC coupler properly fitted or not. (होटल लोड UIC कपलर सही प्रकार से फिट है या नहीं जांचें)
3. Hotel Load UIC coupler pin to be checked and ensure no deformity in Hotel Load UIC Coupler. (होटल लोड UIC कपलर पिनों की जांच करें और सुनिश्चित करें कि कपलर में कोई विकृति/मुड़ाव न हो)
4. If any abnormality identified by LP or ETL staff, then following action should be taken at next halt –
a. On Master loco –
   i. Ensure Throttle on ‘0’ & MPJ in Neutral.
   ii. Apply SA-9 to ON position. Keep A-9 in Emergency position.
   iii. Open VCB, drop the pantograph & switch OFF control electronics.
   iv. Switch OFF battery by operating 110 & 112.1 in SB-2 panel.
b. On Slave loco –
   i. If control electronics is in ON condition then switch OFF battery by operating 110 & 112.1 in SB-2 panel.
5. Attend the Hotel Load UIC coupler pin problem, after attending the problem, switch ON the battery of both locos by operating 110 & 112.1 to ON position. (होटल लोड UIC कपलर पिन की समस्या ठीक करें, समस्या निवारण के बाद दोनों लोको में 110 और 112.1 को ON करके बैटरी चालू करें)
6. Try to energize the loco as per procedure from Master loco. If successful, work the train with both locos. If unsuccessful, then make slave loco as dead loco and work the train with single loco i.e. by Master loco. (मास्टर लोको से निर्धारित प्रक्रिया द्वारा एनरजाइज करें। सफल होने पर दोनों लोको से गाड़ी कार्य करें। असफल होने पर स्लेव लोको को DEAD बनाएं और केवल मास्टर लोको (सिंगल लोको) से ट्रेन चलाएं)"""
    },
    {
        "page": 59,
        "part": "PART-B: Troubleshooting Directory",
        "title": "E-70 Brake System Push-Pull Settings & Cock Positions",
        "text": """E-70 BRAKE SYSTEM IN PUSH-PULL LOCOMOTIVES:
Master Loco:
- Cock No. 70: OPEN (BP charging).
- Cock No. 74: OPEN (Emergency exhaust).
- Cock No. 136: OPEN (Brake pipe control).
- Cock No. 47: CLOSED (Dead loco cock).
- IG-38: Horizontal.
Slave Loco:
- Cock No. 70: OPEN.
- Cock No. 74: OPEN.
- Cock No. 136: STRICTLY CLOSED!
- Cock No. 47: CLOSED (Open only if Slave is made Dead)."""
    },
    {
        "page": 60,
        "part": "PART-B: Troubleshooting Directory",
        "title": "Knorr CCB 2.0 Brake System Setup for Push-Pull",
        "text": """KNORR CCB 2.0 BRAKE SYSTEM IN PUSH-PULL:
Master Loco:
- Driving Cab: Mode selector switch in 'LEAD'.
- Non-Driving Rear Cab: Mode selector switch in 'TRAIL'.
Slave Loco:
- Both Driving and Non-Driving Cabs: Mode selector switch in 'TRAIL'.
- A-9 Handles: Kept in Full Service (FS) and locked.
- SA-9 Handles: Kept in RELEASE in both cabs.
- In case of CCB electronics failure: Utilize PTDC (Pneumatic Trail Direct Control) mode."""
    },
    {
        "page": 61,
        "part": "PART-C: Amrit Bharat Coaches",
        "title": "Amrit Bharat Coaches (LSRD, LSCN, LWS) Rake Architecture",
        "text": """AMRIT BHARAT COACH FORMATION (22 COACHES):
LOCO + 1 LSRD + 4 LWS + 12 LSCN + 4 LWS + 1 LSRD + LOCO
- LSRD: Luggage, Second Class, Guard & Divyangjan Coach (fitted with SBC-0195 cabinet).
- LWS: Second Class General Seating Coach.
- LSCN: Sleeper Class Non-AC Coach.
- Push-Pull trainline: 22-pin UIC jumper running through the entire length of 22 coaches."""
    },
    {
        "page": 62,
        "part": "PART-C: Amrit Bharat Coaches",
        "title": "SBC-0195 Switch Board Cabinet in LSRD Coach",
        "text": """SBC-0195 SWITCH BOARD CABINET (HOG CONTROL):
Controls:
- Push buttons S2S84 (110V DC Main ON), S2S23 (24V DC ON).
- Test lamp S2S22.
- Selector switch S2S52 (CON-A / CON-B / CON-A&B).
- Bus Coupler switch S2S12 (for interconnecting feeder A and feeder B).
- Feeder-A controls: S2S14 (ON), S2S13 (OFF).
- Feeder-B controls: S2S16 (ON), S2S15 (OFF).
- Safety loop interlocks: S2S18 & S2S20 in ON condition."""
    },
    {
        "page": 63,
        "part": "PART-C: Amrit Bharat Coaches",
        "title": "PAPIS, Passenger Amenities & Safety Loops",
        "text": """PASSENGER AMENITIES & COACH ELECTRICALS:
- PAPIS (Passenger Announcement & Passenger Information System): Audio announcements and LED display boards.
- Emergency Talk-Back Units: Installed in all coaches connected to Guard/LSRD and driver cab.
- Fire & Smoke Detection System: Audio-visual alarms in all passenger areas.
- Safety Loop Interlocks: Continuously monitor trainline continuity. If loop opens, HOG supply cuts off automatically."""
    },
    {
        "page": 64,
        "part": "PART-D: Technical Features",
        "title": "22-Pin UIC Push-Pull Trainline Coupler (RDSO MS 477)",
        "text": """22-PIN UIC CIRCULAR PUSH-PULL TRAINLINE COUPLER:
- Standard: RDSO Specification MS 477.
- Function: Carries WTB (Wired Train Bus) RS-485 differential signals between Master and Slave locomotives.
- Jumper configuration:
  * Straight Jumper: Used at one end of the rake.
  * Cross Jumper: Used at the other end of the rake as per pinout matrix.
- Precaution: Ensure protective dust caps are fitted when couplers are uncoupled."""
    },
    {
        "page": 65,
        "part": "PART-D: Technical Features",
        "title": "WTB Repeaters in Coaches 6, 12, and 18",
        "text": """WTB REPEATER UNITS IN COACHES 6, 12, AND 18:
- Purpose: Amplifies and regenerates high-speed communication signals over the 600-meter rake length.
- Location: Positioned inside electrical equipment lockers adjacent to lavatories in Coach 6, Coach 12, and Coach 18.
- Power Supply: Powered by 110V DC coach batteries through dedicated DC-DC converter cards.
- Precaution: If WTB communication fails (F1901P1), verify coach battery MCB in these specific coaches."""
    },
    {
        "page": 66,
        "part": "PART-D: Technical Features",
        "title": "Hotel Load 13-Pin UIC & 500A IVC Couplers",
        "text": """HOTEL LOAD COUPLERS (HLC & IVC):
- 13-pin UIC Coupler: Carries ON/OFF control commands, feeder selection, and safety interlock signals for HLC.
- 500A IVC (Intervehicular Couplers): Two high-capacity power jumpers carrying 750V 3-phase AC power.
- Pin Maintenance: Clean contact pins and check spring tension regularly. Replace worn pins immediately."""
    },
    {
        "page": 67,
        "part": "PART-D: Technical Features",
        "title": "Aerodynamic Driver Desk Controls & Push-Pull Summary",
        "text": """AERODYNAMIC DRIVER DESK & PUSH-PULL SUMMARY:
Desk Layout:
- 'A' Panel: ZNN Switch, BLDJ, ZPT, BLCP, BPPB, BPCS.
- 'D' Panel: ADD BL Key slot, ADD BPFA lamp, ADD LSDJ lamp.
Key Rules Summary:
1. Energize Slave first via ADD BL (45s).
2. Wait for Node 504 on both locos before raising panto.
3. For Neutral Section: ZNN switch ON, operate BLDJ on Master.
4. Slave loco brakes not releasing (BC 3.5 kg/cm²): SA-9 Release, C3W valve, tap 57/58 D-2 (or TP-16/20/BC in CCB), 94 cock, bogie cocks (Page 53).
5. For F1901P1 WTB fault: Slave holds for 60 min; press BPFA to isolate train bus and work single loco."""
    }
]

with open('amrit_bharat_pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages, f, ensure_ascii=False, indent=2)

print(f"Successfully wrote {len(pages)} complete pages to amrit_bharat_pages.json")
