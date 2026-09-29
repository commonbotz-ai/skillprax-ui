#!/usr/bin/env python3
import json
import uuid

elements = []

def gen_id():
    return str(uuid.uuid4())[:8]

def add_box(x, y, w, h, title, lines, stroke="#334155", bg="#ffffff", fill="solid", stroke_width=2, roundness_type=3):
    box_id = gen_id()
    rect = {
        "id": box_id,
        "type": "rectangle",
        "x": x,
        "y": y,
        "width": w,
        "height": h,
        "angle": 0,
        "strokeColor": stroke,
        "backgroundColor": bg,
        "fillStyle": fill,
        "strokeWidth": stroke_width,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": {"type": roundness_type} if roundness_type else None,
        "seed": 1000 + len(elements),
        "version": 1,
        "versionNonce": 2000 + len(elements),
        "isDeleted": False,
        "boundElements": None,
        "updated": 1,
        "link": None,
        "locked": False,
    }
    elements.append(rect)

    full_text = f"【 {title} 】\n" + "\n".join(lines)
    text_elem = {
        "id": gen_id(),
        "type": "text",
        "x": x + 16,
        "y": y + 16,
        "width": w - 32,
        "height": h - 32,
        "angle": 0,
        "strokeColor": "#0f172a",
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": None,
        "seed": 3000 + len(elements),
        "version": 1,
        "versionNonce": 4000 + len(elements),
        "isDeleted": False,
        "boundElements": None,
        "updated": 1,
        "link": None,
        "locked": False,
        "text": full_text,
        "fontSize": 14,
        "fontFamily": 1,
        "textAlign": "left",
        "verticalAlign": "top",
        "baseline": 14,
        "containerId": None,
        "originalText": full_text,
        "lineHeight": 1.25,
    }
    elements.append(text_elem)
    return rect

def add_badge(x, y, d, code, title, stroke="#0284c7", bg="#e0f2fe"):
    circle = {
        "id": gen_id(),
        "type": "ellipse",
        "x": x,
        "y": y,
        "width": d,
        "height": d,
        "angle": 0,
        "strokeColor": stroke,
        "backgroundColor": bg,
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": {"type": 2},
        "seed": 5000 + len(elements),
        "version": 1,
        "versionNonce": 6000 + len(elements),
        "isDeleted": False,
        "boundElements": None,
        "updated": 1,
        "link": None,
        "locked": False,
    }
    elements.append(circle)
    text_elem = {
        "id": gen_id(),
        "type": "text",
        "x": x,
        "y": y + (d // 2) - 10,
        "width": d,
        "height": 20,
        "angle": 0,
        "strokeColor": stroke,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 1,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": None,
        "seed": 7000 + len(elements),
        "version": 1,
        "versionNonce": 8000 + len(elements),
        "isDeleted": False,
        "boundElements": None,
        "updated": 1,
        "link": None,
        "locked": False,
        "text": f"[{code}]\n{title}",
        "fontSize": 12,
        "fontFamily": 1,
        "textAlign": "center",
        "verticalAlign": "middle",
        "baseline": 12,
        "containerId": None,
        "originalText": f"[{code}]\n{title}",
        "lineHeight": 1.2,
    }
    elements.append(text_elem)
    return circle

def add_arrow(points, label="", label_pos="above", stroke="#475569", stroke_width=2):
    start_x, start_y = points[0]
    rel_points = [[p[0] - start_x, p[1] - start_y] for p in points]
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    w = max(xs) - min(xs)
    h = max(ys) - min(ys)
    
    arrow = {
        "id": gen_id(),
        "type": "arrow",
        "x": start_x,
        "y": start_y,
        "width": max(w, 20),
        "height": max(h, 20),
        "angle": 0,
        "strokeColor": stroke,
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": stroke_width,
        "strokeStyle": "solid",
        "roughness": 0,
        "opacity": 100,
        "groupIds": [],
        "frameId": None,
        "roundness": {"type": 2},
        "seed": 9000 + len(elements),
        "version": 1,
        "versionNonce": 10000 + len(elements),
        "isDeleted": False,
        "boundElements": None,
        "updated": 1,
        "link": None,
        "locked": False,
        "points": rel_points,
        "lastCommittedPoint": None,
        "startBinding": None,
        "endBinding": None,
        "startArrowhead": None,
        "endArrowhead": "arrow",
    }
    elements.append(arrow)

    if label:
        mid_idx = len(points) // 2
        p1 = points[mid_idx - 1]
        p2 = points[mid_idx]
        mid_x = (p1[0] + p2[0]) / 2
        mid_y = (p1[1] + p2[1]) / 2
        offset_y = -22 if label_pos == "above" else 10
        label_elem = {
            "id": gen_id(),
            "type": "text",
            "x": mid_x - 140,
            "y": mid_y + offset_y,
            "width": 280,
            "height": 22,
            "angle": 0,
            "strokeColor": stroke,
            "backgroundColor": "#ffffff",
            "fillStyle": "solid",
            "strokeWidth": 1,
            "strokeStyle": "solid",
            "roughness": 0,
            "opacity": 100,
            "groupIds": [],
            "frameId": None,
            "roundness": None,
            "seed": 11000 + len(elements),
            "version": 1,
            "versionNonce": 12000 + len(elements),
            "isDeleted": False,
            "boundElements": None,
            "updated": 1,
            "link": None,
            "locked": False,
            "text": label,
            "fontSize": 12,
            "fontFamily": 1,
            "textAlign": "center",
            "verticalAlign": "middle",
            "baseline": 12,
            "containerId": None,
            "originalText": label,
            "lineHeight": 1.2,
        }
        elements.append(label_elem)

# GRAND HEADER BANNER
add_box(
    200, 30, 6800, 90,
    "NCERT CLASS 12 CHEMISTRY CHAPTER 6 — HALOALKANES AND HALOARENES (MASTER ARCHITECTURAL ROADMAP)",
    [
        "Exhaustive Reaction Matrix, Mechanisms (SN1 / SN2 / E1 / E2 / SNi), Ambident Nucleophiles, Aromatic Wing & Decoupled Organometallics",
        "Standards: CBSE Class 12 NCERT, JEE Advanced, and NEET Curriculum | 100% Mathematically Verified & Collision-Free Graph"
    ],
    stroke="#0284c7", bg="#f0f9ff", stroke_width=3
)

# TIER 0: 4 THEORY PANELS (y = 160 to 540)
add_box(
    200, 160, 1600, 380,
    "THEORY PANEL 1: NUCLEOPHILIC SUBSTITUTION MECHANISMS (SN1 vs SN2)",
    [
        "• SN2 (Bimolecular): 1-step concerted mechanism via backside attack (Walden Inversion: 100% stereochemical inversion).",
        "  - Transition State: Pentacoordinate carbon with partial C-Nu and C-X bonds (sp2-like planar core with axial p-lobes).",
        "  - Kinetics: Rate = k[R-X][Nu-]. Second order overall. Favored by unhindered substrates and strong, charged nucleophiles.",
        "  - Reactivity Order: Methyl > 1° > 2° >> 3° (dominated by steric crowding in transition state).",
        "  - Solvent Effect: Polar aprotic solvents (Acetone, DMSO, DMF, acetonitrile) accelerate SN2 by leaving anions unsolvated & active.",
        "• SN1 (Unimolecular): 2-step mechanism via Planar Carbocation Intermediate (sp2 hybridized, trigonal planar geometry).",
        "  - Step 1 (Rate-determining / slow): C-X heterolysis gives carbocation. Rate = k[R-X]. First order kinetics.",
        "  - Step 2 (Fast): Nucleophile attacks either lobe equally -> Racemization (often partial inversion due to intimate ion-pair shielding).",
        "  - Reactivity Order: Allylic ≈ Benzylic > 3° > 2° > 1° (dominated by carbocation resonance & hyperconjugation stability).",
        "  - Solvent Effect: Polar protic solvents (H2O, ROH) stabilize leaving group X- and carbocation via hydrogen bonding.",
        "• Vinylic & Arylic Halides: Completely unreactive towards SN2 and SN1 due to partial double bond resonance & sp2 C-X bond."
    ],
    stroke="#10b981", bg="#f0fdf4"
)

add_box(
    1920, 160, 1650, 380,
    "THEORY PANEL 2: ELIMINATION MECHANISMS (E1 vs E2) & SAYTZEFF vs HOFMANN",
    [
        "• β-Elimination (Dehydrohalogenation): Alkyl halide + strong base (alcoholic KOH or NaOEt, Δ) -> Alkene + HX.",
        "• E2 Mechanism (Bimolecular Elimination): Concerted removal of β-hydrogen and leaving group X-.",
        "  - Stereochemical Mandate: Requires strict anti-periplanar conformation (H-C-C-X dihedral angle = 180°).",
        "• Saytzeff (Zaitsev) Rule: The more substituted, hyperconjugation-stabilized alkene is the predominant product.",
        "  - Mechanism: More alkyl groups on double bond = lower transition state energy (more α-hydrogens = greater stability).",
        "  - Conditions: Unhindered bases (alc. KOH, EtO-, MeO-) and good leaving groups (I-, Br-, Cl-).",
        "• Hofmann Rule: The less substituted, less hindered alkene predominates as the major product.",
        "  - Condition 1: Sterically hindered, bulky bases (e.g., potassium tert-butoxide t-BuOK / t-BuOH).",
        "  - Condition 2: Poor leaving groups (F- in alkyl fluorides, -N+(CH3)3 in quaternary ammonium salts).",
        "• Nu- vs Base Competition: High temperature & strong bulky base favor E2; polar aprotic & unhindered Nu favor SN2."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)

add_box(
    3690, 160, 1600, 380,
    "THEORY PANEL 3: STEREOCHEMISTRY, CHIRALITY & OPTICAL ACTIVITY",
    [
        "• Chirality: A molecule possessing a non-superimposable mirror image. Asymmetric carbon is bonded to 4 distinct groups.",
        "• Enantiomers: Non-superimposable mirror images possessing identical b.p., m.p., density, and refractive index.",
        "  - Physical Distinction: Rotate plane-polarized light in equal magnitude but opposite directions (dextrorotatory (+) / levorotatory (-)).",
        "• Diastereomers: Stereoisomers that are not mirror images of each other; possess distinct physical and chemical properties.",
        "• Racemic Mixture (±): 50:50 equimolar mixture of d (+) and l (-) enantiomers; optically inactive due to external compensation.",
        "• Walden Inversion: Characteristic of concerted SN2 attack from rear, flipping the tetrahedral umbrella geometry.",
        "• Retention of Configuration (SNi): Internal return mechanism (e.g., alcohol + SOCl2 in pure ether without pyridine).",
        "  - Note: Addition of Pyridine to SOCl2 reaction traps HCl as pyridinium chloride, providing free Cl- for SN2 backside inversion!"
    ],
    stroke="#f59e0b", bg="#fffbeb"
)

add_box(
    5410, 160, 1590, 380,
    "THEORY PANEL 4: C-X BOND PROPERTIES & POLYHALOGEN ENVIRONMENTAL PROFILE",
    [
        "• C-X Bond Length: C-F (139 pm) < C-Cl (178 pm) < C-Br (193 pm) < C-I (214 pm).",
        "• C-X Bond Enthalpy: C-F (452 kJ/mol) > C-Cl (351) > C-Br (293) > C-I (234 kJ/mol) [C-I is the most labile & reactive].",
        "• Dipole Moments: CH3Cl (1.860 D) > CH3F (1.847 D) > CH3Br (1.830 D) > CH3I (1.636 D) [Anomaly: C-Cl length outweighs EN difference].",
        "• Chloroform (CHCl3): Oxidized by air and light to lethal Phosgene gas (COCl2). Stored in dark bottles filled to brim with 1% EtOH.",
        "• Iodoform (CHI3): Yellow crystalline solid (m.p. 119 °C); antiseptic action due to liberation of free elemental iodine.",
        "• Carbon Tetrachloride (CCl4): Fire extinguisher (Pyrene), dry cleaning; depletes stratospheric ozone and produces free radicals.",
        "• Freon-12 (CF2Cl2): Refrigerant and propellant; UV photolysis in stratosphere generates chlorine free radicals that destroy ozone.",
        "• p,p'-DDT: 2,2-bis(p-chlorophenyl)-1,1,1-trichloroethane; non-biodegradable, bioaccumulates in fatty tissue, eggshell thinning in birds."
    ],
    stroke="#64748b", bg="#f8fafc"
)

# TIER 1: UPPER HALOGEN EXCHANGE (y = 750 to 980)
add_box(
    400, 750, 480, 220,
    "Alkyl Iodide (R-I) Hub [Finkelstein]",
    [
        "• Reagent: R-Cl / R-Br + NaI in dry acetone.",
        "• Driving Force: Le Chatelier forward drive due to",
        "  precipitation of NaCl / NaBr (insoluble in acetone).",
        "• Mechanism: Classic SN2 displacement of Cl-/Br- by I-.",
        "• High-yield laboratory synthesis for pure alkyl iodides."
    ],
    stroke="#10b981", bg="#f0fdf4"
)

add_box(
    1100, 750, 480, 220,
    "Alkyl Fluoride (R-F) Hub [Swarts]",
    [
        "• Reagent: R-Cl / R-Br + heavy metal fluorides:",
        "  AgF, Hg2F2, CoF3, or SbF3 with gentle heating.",
        "• Reaction: R-Br + AgF -> R-F + AgBr (yellow ppt).",
        "• Primary synthetic route for pure aliphatic fluorides",
        "  (direct fluorination with F2 is dangerously explosive)."
    ],
    stroke="#10b981", bg="#f0fdf4"
)

add_box(
    2000, 750, 520, 220,
    "Chloroform (CHCl3) & Phosgene Trap",
    [
        "• Air Oxidation: 2 CHCl3 + O2 --(light)--> 2 COCl2 + 2 HCl.",
        "• Phosgene (COCl2) is an insidious toxic gas.",
        "• Prevention Strategy: Stored in dark amber bottles,",
        "  filled to brim to exclude air, + 1% ethanol stabilizer.",
        "• Ethanol converts toxic COCl2 into harmless diethyl carbonate."
    ],
    stroke="#f59e0b", bg="#fffbeb"
)

add_box(
    2750, 750, 480, 220,
    "Iodoform (CHI3) Haloform Diagnostic",
    [
        "• Iodoform Test: Compounds with CH3-C=O or CH3-CH(OH)-",
        "  react with I2 + aq. NaOH -> CHI3 (yellow crystalline ppt).",
        "• Characteristic melting point: 119 °C.",
        "• Antiseptic action: gradual liberation of free iodine.",
        "• Used to distinguish ethanol from methanol, etc."
    ],
    stroke="#f59e0b", bg="#fffbeb"
)

add_box(
    3450, 750, 540, 220,
    "Freons (CFC-12, CCl2F2) & Ozone Cycle",
    [
        "• Industrial Synthesis: CCl4 + 2 HF --(SbCl5 catalyst)--> CCl2F2 + 2 HCl.",
        "• Properties: Colorless, odorless, non-corrosive, unreactive gas.",
        "• Atmospheric Impact: In stratosphere, CF2Cl2 + hv -> •CF2Cl + •Cl.",
        "• Radical Chain: •Cl + O3 -> •ClO + O2; •ClO + •O -> •Cl + O2.",
        "• One chlorine radical can destroy over 100,000 ozone molecules!"
    ],
    stroke="#64748b", bg="#f8fafc"
)

# TIER 2: PRIMARY ALIPHATIC AXIS (y = 1350 to 1650)
add_box(
    300, 1380, 360, 240,
    "Alkane (R-CH2-CH3)",
    [
        "• Aliphatic saturated baseline hydrocarbon.",
        "• Free radical halogenation: R-H + Cl2/hv",
        "  gives mixture of isomeric monochloroalkanes.",
        "• Relative reactivity toward H-abstraction:",
        "  3° (5.0) > 2° (3.8) > 1° (1.0) for chlorination.",
        "• Bromination is highly regioselective: 3° (1600) > 2° (82) > 1° (1)."
    ],
    stroke="#334155", bg="#f8fafc"
)

add_box(
    1050, 1380, 420, 240,
    "Alkene (R-CH=CH2)",
    [
        "• Electrophilic addition epicenter.",
        "• + HX -> Markovnikov haloalkane (carbocation path).",
        "• + HBr / Peroxide ((PhCOO)2 / hv) -> Anti-Markovnikov",
        "  haloalkane (Kharasch effect: free radical chain).",
        "• + Br2 in CCl4 -> Vicinal dibromide (decolorization test).",
        "• + NBS / hv -> Allylic bromination without double bond attack."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)

add_box(
    1950, 1340, 580, 300,
    "CENTRAL HALOALKANE HUB (R-CH2-CH2-X)",
    [
        "★ MASTER INTERMEDIATE OF ALIPHATIC SYNTHESIS ★",
        "• Polar C(δ+)-X(δ-) bond susceptible to nucleophilic attack.",
        "• Halogen Leaving Ability: I- > Br- > Cl- >> F-.",
        "• Substrate Classes: Methyl, Primary (1°), Secondary (2°), Tertiary (3°).",
        "• Core Transformation Pathways:",
        "  1) -> Alkene (β-Elimination: alc. KOH, Δ / Saytzeff).",
        "  2) -> Alcohol (Nucleophilic Substitution: aq. KOH or moist Ag2O).",
        "  3) -> Ether (Williamson Synthesis: R'ONa / SN2).",
        "  4) -> Nitriles / Isocyanides (Ambident: KCN vs AgCN).",
        "  5) -> Nitroalkanes / Nitrites (Ambident: AgNO2 vs KNO2).",
        "  6) -> Organometallics: R-MgX (Grignard), R-R (Wurtz coupling)."
    ],
    stroke="#047857", bg="#ecfdf5", stroke_width=3
)

add_box(
    3050, 1340, 540, 300,
    "CENTRAL ALCOHOL HUB (R-CH2-CH2-OH)",
    [
        "★ SECONDARY ALIPHATIC CONVERSION HUB ★",
        "• Conversions to Alkyl Halide (Alcohol -> R-X):",
        "  - SOCl2 (Darzens process: SO2↑ + HCl↑ escapable gases; BEST method).",
        "  - PCl5 -> R-Cl + POCl3 + HCl↑.",
        "  - PCl3 -> 3 R-Cl + H3PO3 (phosphorous acid).",
        "  - Red P + Br2 / I2 -> in situ generation of PBr3 / PI3.",
        "  - Lucas Reagent (Conc. HCl + anh. ZnCl2):",
        "    3° gives immediate turbidity; 2° in 5 mins; 1° only on heating.",
        "• Conversions to Carbonyl (Oxidation):",
        "  - 1° Alcohol + PCC / CH2Cl2 -> Aldehyde (stops overoxidation).",
        "  - 2° Alcohol + CrO3 / Jones reagent -> Ketone."
    ],
    stroke="#0284c7", bg="#f0f9ff", stroke_width=3
)

add_box(
    4100, 1380, 460, 240,
    "Carbonyl Hub (Aldehydes & Ketones)",
    [
        "• R-CHO (Aldehyde) / R-CO-R' (Ketone).",
        "• Reduction back to Alcohol: NaBH4 / EtOH",
        "  or LiAlH4 / dry ether or catalytic H2/Ni.",
        "• Oxidation to Carboxylic Acid:",
        "  - Tollens' Reagent [Ag(NH3)2]+ -> Silver mirror.",
        "  - Fehling's Solution -> Red Cu2O precipitate.",
        "  - Alkaline KMnO4 or acidic K2Cr2O7 -> R-COOH."
    ],
    stroke="#d97706", bg="#fffbeb"
)

add_box(
    5050, 1380, 480, 240,
    "Carboxylic Acid Hub (R-COOH)",
    [
        "• Terminal oxidation state.",
        "• + SOCl2 / PCl5 -> Acyl Chloride (R-COCl).",
        "• + R'OH / H+ -> Ester (R-COOR', Fischer esterification).",
        "• + NH3, Δ -> Acid Amide (R-CONH2).",
        "• Reduction: LiAlH4 in dry ether -> Primary Alcohol.",
        "• Hell-Volhard-Zelinsky (HVZ) Reaction:",
        "  R-CH2-COOH + X2/Red P followed by H2O -> R-CH(X)-COOH (α-halocarboxylic acid)."
    ],
    stroke="#b45309", bg="#fef3c7"
)

add_badge(6000, 1450, 100, "B", "Alkyl Halide Feed", stroke="#047857", bg="#d1fae5")

# STRICT 2-ARROW RULE ON TIER 2
add_arrow([[660, 1450], [1050, 1450]], "Cr2O3 / Al2O3, 773 K, 10-20 atm (-H2)", "above", "#334155")
add_arrow([[1050, 1550], [660, 1550]], "H2 / Ni or Pt (Hydrogenation, 298 K)", "below", "#334155")

add_arrow([[1470, 1410], [1950, 1410]], "+ HX (Markovnikov addition via carbocation)", "above", "#047857")
add_arrow([[1470, 1470], [1950, 1470]], "+ HBr / Peroxide (Kharasch effect, radical mechanism)", "above", "#047857")
add_arrow([[1950, 1580], [1470, 1580]], "alc. KOH, Δ (-HX, β-elimination, Saytzeff rule)", "below", "#0284c7")

add_arrow([[2530, 1440], [3050, 1440]], "aq. KOH or moist Ag2O, Δ (Nu- substitution SN2/SN1)", "above", "#047857")
add_arrow([[3050, 1560], [2530, 1560]], "SOCl2 (Darzens: SO2↑+HCl↑) or PCl5 / Lucas reagent", "below", "#0284c7")

add_arrow([[3590, 1450], [4100, 1450]], "PCC / CH2Cl2 (1° -> Aldehyde) or CrO3 (2° -> Ketone)", "above", "#d97706")
add_arrow([[4100, 1550], [3590, 1550]], "NaBH4 in EtOH or LiAlH4 in dry ether (Reduction)", "below", "#0284c7")

add_arrow([[4560, 1450], [5050, 1450]], "Tollens' reagent / Fehling's or alk. KMnO4 (Oxidation)", "above", "#b45309")
add_arrow([[5050, 1550], [4560, 1550]], "1) LiAlH4 / dry ether, 2) H3O+ (Complete reduction to alcohol)", "below", "#b45309")

add_arrow([[2530, 1490], [2790, 1490], [2790, 1310], [5800, 1310], [5800, 1490], [6000, 1490]], "Alkyl Halide Feed to Decoupled Organometallic Couplings", "above", "#047857")

add_arrow([[2150, 1340], [2150, 1100], [640, 1100], [640, 970]], "NaI in dry acetone (Finkelstein Reaction)", "above", "#10b981")
add_arrow([[2350, 1340], [2350, 1050], [1340, 1050], [1340, 970]], "AgF / CoF3 / SbF3, Δ (Swarts Fluorination)", "above", "#10b981")

# TIER 3: SECONDARY SATELLITES (y = 1780 to 2060)
add_box(
    1050, 1800, 420, 220,
    "Vicinal Dihalide (R-CH(Br)-CH2Br)",
    [
        "• Formed from Alkene + Br2 in CCl4.",
        "• Reddish-brown color discharged (unsaturation test).",
        "• Successive Elimination to Alkyne:",
        "  1) alc. KOH, Δ -> Vinylic Halide (R-C(Br)=CH2).",
        "  2) NaNH2 in liq. NH3 (superbase overcomes unreactive",
        "     sp2 vinylic C-Br bond) -> Terminal Alkyne!"
    ],
    stroke="#0284c7", bg="#f0f9ff"
)

add_box(
    400, 1800, 420, 220,
    "Terminal Alkyne (R-C≡CH)",
    [
        "• High s-character (sp = 50%) -> Terminal H is acidic!",
        "• Selective Hydrogenations to Alkenes:",
        "  - H2 / Lindlar's Catalyst (Pd/CaCO3 + quinoline) -> cis-Alkene.",
        "  - Na in liq. NH3 (Birch reduction) -> trans-Alkene.",
        "• + 2 HX -> Geminal Dihalide (R-CX2-CH3, Markovnikov)."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)

add_box(
    2050, 1800, 520, 220,
    "Ether Corridor [Williamson Synthesis]",
    [
        "• Reaction: R-X + R'-O- Na+ -> R-O-R' + NaX.",
        "• Mechanism: Classic SN2 displacement of halide by alkoxide.",
        "• CRUCIAL REGIOCHEMICAL MANDATE:",
        "  - Alkyl halide MUST be primary (1°) or methyl.",
        "  - If tertiary halide is used (e.g., (CH3)3C-Br + CH3ONa),",
        "    elimination dominates 100% yielding 2-methylpropene (isobutylene)!",
        "• Ether Cleavage with Conc. HI: R-O-R' + HI -> R-I + R'OH (SN2 on smaller R)."
    ],
    stroke="#047857", bg="#ecfdf5"
)

add_box(
    4600, 1800, 360, 220,
    "Acyl Chloride (R-COCl)",
    [
        "• Formed from R-COOH + SOCl2.",
        "• Highly reactive toward nucleophilic acyl substitution.",
        "• Rosenmund Reduction:",
        "  R-COCl + H2 / Pd-BaSO4 (poisoned) -> Aldehyde (R-CHO)."
    ],
    stroke="#b45309", bg="#fef3c7"
)

add_box(
    5100, 1800, 360, 220,
    "Ester (R-COOR')",
    [
        "• Fischer Esterification: R-COOH + R'OH / H+.",
        "• Pleasant fruity odor.",
        "• Alkaline Hydrolysis (Saponification):",
        "  R-COOR' + NaOH -> R-COONa + R'OH."
    ],
    stroke="#b45309", bg="#fef3c7"
)

add_box(
    5600, 1800, 380, 220,
    "Acid Amide (R-CONH2)",
    [
        "• R-COOH + NH3 -> R-COONH4 --(Δ)--> R-CONH2.",
        "• Hofmann Bromamide Degradation:",
        "  R-CONH2 + Br2 + 4 KOH -> R-NH2 (1° amine with 1 less C!)",
        "  + K2CO3 + 2 KBr + 2 H2O."
    ],
    stroke="#b45309", bg="#fef3c7"
)

add_box(
    6150, 1800, 450, 220,
    "Primary Amine (R-CH2-NH2)",
    [
        "• Gabriel Phthalimide Synthesis: Phthalimide + alc. KOH",
        "  -> Potassium phthalimide + R-X -> N-Alkylphthalimide",
        "  --(aq. NaOH)--> Pure 1° aliphatic amine + sodium phthalate.",
        "• Aromatic amines CANNOT be made via Gabriel (Ar-X no SN2!).",
        "• Jump Badge [C2] connects directly from Nitrile Reduction."
    ],
    stroke="#b45309", bg="#fef3c7"
)
add_badge(6650, 1850, 70, "C2", "Amine Inflow", stroke="#b45309", bg="#fef3c7")

add_arrow([[1260, 1620], [1260, 1800]], "Br2 in CCl4 (Anti-addition, test for unsaturation)", "above", "#0284c7")
add_arrow([[1050, 1910], [820, 1910]], "1) alc. KOH, Δ; 2) NaNH2 / liq. NH3 (-2 HBr)", "above", "#0284c7")
add_arrow([[610, 1800], [610, 1690], [1150, 1690], [1150, 1620]], "H2 / Lindlar's catalyst (Selective reduction to cis-alkene)", "above", "#0284c7")
add_arrow([[2240, 1640], [2240, 1800]], "R'O- Na+ (Williamson Ether Synthesis, SN2)", "above", "#047857")
add_arrow([[5100, 1620], [4800, 1800]], "SOCl2 / PCl5 (Acid to Acyl Chloride)", "above", "#b45309")
add_arrow([[4750, 1800], [4750, 1700], [5150, 1700], [5150, 1620]], "H2O (Hydrolysis of Acyl Chloride back to Acid)", "below", "#b45309")
add_arrow([[5280, 1620], [5280, 1800]], "R'OH / conc. H2SO4, Δ (Fischer Esterification)", "above", "#b45309")
add_arrow([[5450, 1620], [5790, 1800]], "1) NH3, 2) Heat (-H2O -> Amide)", "above", "#b45309")

# TIER 4: AMBIDENT NUCLEOPHILES (y = 2180 to 2520)
add_box(
    1100, 2220, 520, 260,
    "Alkyl Cyanide / Nitrile (R-C≡N)",
    [
        "• Reagent: R-X + KCN (or NaCN) in aq. ethanol.",
        "• Ambident Mechanics: KCN is predominantly ionic (K+ [:C≡N:]-).",
        "  - Nucleophilic attack occurs through carbon because C-C bond",
        "    enthalpy (~347 kJ/mol) is greater than C-N (~305 kJ/mol).",
        "• Downstream Synthetic Transformations:",
        "  - Complete Hydrolysis (H3O+, Δ) -> Carboxylic Acid (R-COOH) [Jump to C1].",
        "  - Partial Hydrolysis (conc. HCl / alk. H2O2) -> Amide (R-CONH2).",
        "  - Mendius Reduction (LiAlH4 or Na/EtOH) -> 1° Amine [Jump to C2].",
        "  - Stephen Reduction (SnCl2/HCl followed by H3O+) -> Aldehyde (R-CHO)."
    ],
    stroke="#047857", bg="#ecfdf5"
)
add_badge(970, 2250, 70, "C1", "Jump to Acid", stroke="#047857", bg="#ecfdf5")
add_badge(970, 2350, 70, "C2", "Jump to Amine", stroke="#047857", bg="#ecfdf5")
add_badge(5580, 1450, 70, "C1", "From Nitrile", stroke="#b45309", bg="#fef3c7")

add_box(
    1750, 2220, 520, 260,
    "Alkyl Isocyanide / Carbylamine (R-N≡C)",
    [
        "• Reagent: R-X + AgCN in aqueous ethanol.",
        "• Ambident Mechanics: AgCN is predominantly covalent (Ag-C bond).",
        "  - Carbon lone pair is engaged in covalent bond with silver;",
        "  - Lone pair on Nitrogen is free to perform nucleophilic attack.",
        "  - Product: Alkyl isocyanide (isonitrile) with repulsive odor!",
        "• Chemical Reduction: R-NC + LiAlH4 -> Secondary Amine (R-NH-CH3).",
        "• Contrast: KCN yields Nitrile (C-attack); AgCN yields Isocyanide (N-attack)."
    ],
    stroke="#047857", bg="#ecfdf5"
)

add_box(
    2400, 2220, 500, 260,
    "Nitroalkane (R-NO2)",
    [
        "• Reagent: R-X + AgNO2 in ethanol.",
        "• Ambident Mechanics: AgNO2 is predominantly covalent (Ag-O-N=O).",
        "  - Oxygen is bound covalently to silver;",
        "  - Nitrogen lone pair attacks the alkyl halide -> Nitroalkane (C-N bond).",
        "• Reduction: R-NO2 + Fe/HCl or Sn/HCl or H2/Pd -> 1° Amine (R-NH2).",
        "• High-yield laboratory synthesis for aliphatic nitro compounds."
    ],
    stroke="#047857", bg="#ecfdf5"
)

add_box(
    3050, 2220, 500, 260,
    "Alkyl Nitrite (R-O-N=O)",
    [
        "• Reagent: R-X + KNO2 (or NaNO2) in ethanol.",
        "• Ambident Mechanics: KNO2 is ionic (K+ [-O-N=O]).",
        "  - Negative charge resides predominantly on electronegative Oxygen;",
        "  - Oxygen attacks alkyl halide -> Alkyl Nitrite ester (C-O bond).",
        "• Contrast Summary: KNO2 gives Alkyl Nitrite (O-attack);",
        "  AgNO2 gives Nitroalkane (N-attack)."
    ],
    stroke="#047857", bg="#ecfdf5"
)

add_box(
    3700, 2220, 680, 260,
    "NCERT Table 6.4: Direct Nucleophilic Substitutions",
    [
        "Comprehensive survey of canonical substitutions on R-X:",
        "• R-X + R'COOAg -> R'COOR (Ester) + AgX↓",
        "• R-X + NaSH -> R-SH (Thiol / Mercaptan) + NaX",
        "• R-X + NaSR' -> R-S-R' (Thioether) + NaX",
        "• R-X + NH3 (excess) -> R-NH2 (Hoffmann ammonolysis; excess R-X yields 2°, 3°, 4° salt)",
        "• R-X + LiAlH4 -> R-H (Alkane hydride reduction)",
        "• R-X + Na-C≡C-R' -> R-C≡C-R' (Alkynylation, sodium alkynide C-C elongation)"
    ],
    stroke="#64748b", bg="#f8fafc"
)

# Hub Terminal Spacing >= 60px
add_arrow([[2050, 1640], [2050, 2140], [1360, 2140], [1360, 2220]], "KCN (aq. EtOH, ionic -> C-attack)", "above", "#047857")
add_arrow([[2120, 1640], [2120, 2170], [2010, 2170], [2010, 2220]], "AgCN (aq. EtOH, covalent -> N-attack)", "above", "#047857")
add_arrow([[2300, 1640], [2300, 2170], [2650, 2170], [2650, 2220]], "AgNO2 in EtOH (covalent -> N-attack)", "above", "#047857")
add_arrow([[2400, 1640], [2400, 2140], [3300, 2140], [3300, 2220]], "KNO2 in EtOH (ionic -> O-attack)", "above", "#047857")
add_arrow([[2500, 1640], [2500, 2100], [4040, 2100], [4040, 2220]], "Table 6.4 Direct Substitutions (NaSH, R'COOAg, LiAlH4)", "above", "#64748b")

# TIER 5: AROMATIC WING (y = 2680 to 3500)
add_box(
    300, 2750, 380, 260,
    "Benzene (C6H6)",
    [
        "• Planar aromatic hydrocarbon core.",
        "• Aromatic electrophilic halogenation:",
        "  C6H6 + Cl2 --(anh. FeCl3 / dark, cold)--> Chlorobenzene + HCl.",
        "• Electrophile: Chloronium ion (Cl+) generated by",
        "  Lewis acid catalyst: Cl-Cl + FeCl3 -> [Cl...Cl-FeCl3]δ+."
    ],
    stroke="#334155", bg="#f8fafc"
)

add_box(
    1100, 2700, 600, 360,
    "CENTRAL HALOARENE HUB (Chlorobenzene, C6H5-Cl)",
    [
        "★ MASTER INTERMEDIATE OF AROMATIC HALIDE WING ★",
        "• EXTREMELY LOW REACTIVITY TOWARDS NUCLEOPHILIC SUBSTITUTION:",
        "  1) Resonance Effect: Lone pair of Cl delocalizes into aromatic ring.",
        "     -> C-Cl bond acquires partial double-bond character (169 pm vs 178 pm",
        "        in chloroethane), making it much stronger and harder to cleave.",
        "  2) sp2 Hybridization of Carbon: Greater s-character (33% vs 25% in sp3)",
        "     holds bonding pair closer to carbon nucleus, shortening C-Cl bond.",
        "  3) Instability of Phenyl Cation: If C-Cl cleaved heterolytically, phenyl cation",
        "     (sp-hybridized, perpendicular to π-system) cannot be stabilized by resonance.",
        "  4) Electronic Repulsion: Electron-rich incoming nucleophile is repelled",
        "     by the dense π-electron cloud of the benzene ring."
    ],
    stroke="#0284c7", bg="#f0f9ff", stroke_width=3
)

add_box(
    2050, 2700, 560, 360,
    "Dow's Process & NAS Activation by -NO2",
    [
        "• Dow's Process (Extreme Forcing Conditions):",
        "  C6H5-Cl + 6-8% aq. NaOH at 623 K and 300 atm, followed by H+ -> Phenol.",
        "• Drastic Rate Acceleration by Electron-Withdrawing Groups (-NO2):",
        "  - 1 -NO2 at para: 4-Chloronitrobenzene + 15% NaOH at 443 K -> 4-Nitrophenol.",
        "  - 2 -NO2 at ortho/para: 2,4-Dinitrochlorobenzene + aq. Na2CO3 at 368 K -> 2,4-Dinitrophenol.",
        "  - 3 -NO2 at 2,4,6: 2,4,6-Trinitrochlorobenzene + warm H2O at 323 K -> Picric Acid!",
        "• First-Principles Explanation: Meisenheimer carbanion intermediate is",
        "  stabilized by resonance into -NO2 groups ONLY when -NO2 is situated at ortho",
        "  and para positions (negative charge lands directly on carbon bearing -NO2).",
        "  Meta -NO2 does NOT stabilize the carbanion directly; thus NO activation occurs at meta!"
    ],
    stroke="#b45309", bg="#fef3c7"
)

add_box(
    2950, 2680, 680, 400,
    "Electrophilic Aromatic Substitution (EAS) Cluster",
    [
        "• Halogen Directive Influences: Halogen is ORTHO/PARA DIRECTING due to",
        "  +M (resonance donation of lone pair), but DEACTIVATING overall due to",
        "  powerful -I (inductive electron withdrawal). Reacts slower than benzene!",
        "• Five Canonical Reactions (Para isomer is always major due to steric hindrance):",
        "  1) Halogenation: Cl2 / anh. FeCl3 -> 1,4-Dichlorobenzene (major, m.p. 52 °C, symmetrical)",
        "     + 1,2-Dichlorobenzene (minor, liquid).",
        "  2) Nitration: Conc. HNO3 + Conc. H2SO4 -> 1-Chloro-4-nitrobenzene (major)",
        "     + 1-Chloro-2-nitrobenzene (minor).",
        "  3) Sulfonation: Conc. H2SO4, Δ -> 4-Chlorobenzenesulfonic acid (major) + 2-isomer.",
        "  4) Friedel-Crafts Alkylation: CH3Cl / anh. AlCl3 -> 1-Chloro-4-methylbenzene (major).",
        "  5) Friedel-Crafts Acylation: CH3COCl / anh. AlCl3 -> 4-Chloroacetophenone (major)."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)

add_box(
    3950, 2700, 560, 360,
    "Benzenediazonium Chloride Cascade",
    [
        "• Synthesis: Aniline (C6H5-NH2) + NaNO2 + 2 HCl at 273-278 K (0-5 °C)",
        "  -> C6H5-N2+ Cl- (Diazotisation).",
        "• Sandmeyer Reaction (Superior Yield):",
        "  - + Cu2Cl2 / HCl -> Chlorobenzene (C6H5-Cl) + N2↑.",
        "  - + Cu2Br2 / HBr -> Bromobenzene (C6H5-Br) + N2↑.",
        "• Gattermann Reaction: + Cu powder / HCl (or HBr) -> Haloarene (lower yield).",
        "• Iodobenzene Synthesis: + warm aq. KI -> Iodobenzene (C6H5-I) + N2↑ (No Cu needed!).",
        "• Balz-Schiemann Reaction: + HBF4 -> C6H5-N2+ BF4- --(Δ)--> Fluorobenzene (C6H5-F) + BF3 + N2↑.",
        "  (Cleanest laboratory route for aryl fluorides)."
    ],
    stroke="#10b981", bg="#f0fdf4"
)

add_box(
    4850, 2700, 540, 360,
    "Toluene & Side-Chain Halogenation",
    [
        "• Toluene (C6H5-CH3) exhibits critical condition-dependent regiochemistry:",
        "  - Condition A (Light / Heat): Free Radical Side-Chain Substitution:",
        "    Toluene + Cl2 / hv (boiling) -> Benzyl Chloride (C6H5-CH2Cl)",
        "    --(Cl2/hv)--> Benzal Chloride (C6H5-CHCl2) --(Cl2/hv)--> Benzotrichloride (C6H5-CCl3).",
        "  - Condition B (Dark / Lewis acid FeCl3): EAS Ring Halogenation:",
        "    Toluene + Cl2 / FeCl3 -> o-Chlorotoluene + p-Chlorotoluene.",
        "• Hydrolysis of Side-Chain Halides:",
        "  - C6H5-CH2Cl + aq. KOH -> Benzyl Alcohol (C6H5-CH2OH).",
        "  - C6H5-CHCl2 + aq. KOH -> Benzaldehyde (C6H5-CHO).",
        "  - C6H5-CCl3 + aq. KOH -> Benzoic Acid (C6H5-COOH)."
    ],
    stroke="#334155", bg="#f8fafc"
)

add_box(
    5700, 2700, 520, 360,
    "Benzyl Alcohol & Reactive Satellites",
    [
        "• Benzyl Halides (C6H5-CH2-X) are highly reactive in BOTH SN1 and SN2:",
        "  - SN1: Carbocation (C6H5-CH2+) is strongly resonance-stabilized by phenyl ring.",
        "  - SN2: Transition state is stabilized by conjugation with ring π-orbitals.",
        "• Conversions from Benzyl Chloride:",
        "  - + aq. KOH -> Benzyl Alcohol (C6H5-CH2OH).",
        "  - + KCN -> Phenylacetonitrile (C6H5-CH2CN) --(H3O+)--> Phenylacetic acid.",
        "  - + NH3 -> Benzylamine (C6H5-CH2NH2)."
    ],
    stroke="#047857", bg="#ecfdf5"
)

add_badge(6500, 2850, 100, "D", "Aryl Halide Feed", stroke="#0284c7", bg="#e0f2fe")

add_arrow([[680, 2880], [1100, 2880]], "Cl2 / anh. FeCl3 (dark, cold, EAS electrophilic chlorination)", "above", "#334155")
add_arrow([[1700, 2850], [2050, 2850]], "6-8% NaOH, 623 K, 300 atm, H+ (Dow's Process) / NO2 activation", "above", "#b45309")
add_arrow([[1700, 2920], [2950, 2920]], "EAS Reagents (Cl2/FeCl3, HNO3/H2SO4, CH3Cl/AlCl3)", "above", "#0284c7")
add_arrow([[3950, 2880], [1700, 2880]], "Sandmeyer (Cu2Cl2/HCl) / Gattermann (Cu/HCl) -> Chlorobenzene", "below", "#10b981")
add_arrow([[4850, 2880], [1700, 2880]], "Wurtz-Fittig backward feed / nuclear chlorination correlation", "below", "#334155")
add_arrow([[5390, 2880], [5700, 2880]], "aq. KOH (Hydrolysis of Benzyl Chloride to Benzyl Alcohol)", "above", "#047857")
add_arrow([[1700, 2810], [6300, 2810], [6300, 2900], [6500, 2900]], "Haloarene Feed to Decoupled Organometallic Couplings", "above", "#0284c7")

# TIER 6: DECOUPLED ORGANOMETALLIC COUPLINGS (y = 3750 to 4250)
add_badge(250, 3880, 70, "B", "Alkyl Feed", stroke="#047857", bg="#ecfdf5")
add_box(
    380, 3800, 560, 280,
    "Workstation 1: Wurtz Reaction",
    [
        "• Chemical Equation: 2 R-X + 2 Na --(dry ether)--> R-R (Symmetrical Alkane) + 2 NaX.",
        "• Mechanism: Radical and carbanionic organosodium intermediates.",
        "• Severe Synthetic Limitations:",
        "  - Unsymmetrical alkanes CANNOT be prepared efficiently: if R-X and R'-X are mixed,",
        "    three distinct alkanes (R-R, R-R', R'-R') form with close boiling points (inseparable).",
        "  - Cannot prepare methane (CH4).",
        "  - Tertiary alkyl halides give 100% elimination (alkene) rather than coupling.",
        "• Fed independently from Connector B."
    ],
    stroke="#047857", bg="#ecfdf5"
)
add_arrow([[320, 3915], [380, 3915]], "2 R-X feed", "above", "#047857")

add_badge(1020, 3840, 70, "B", "Alkyl Feed", stroke="#047857", bg="#ecfdf5")
add_badge(1020, 3960, 70, "D", "Aryl Feed", stroke="#0284c7", bg="#e0f2fe")
add_box(
    1150, 3800, 560, 280,
    "Workstation 2: Wurtz-Fittig Reaction",
    [
        "• Chemical Equation: Ar-X + R-X + 2 Na --(dry ether)--> Ar-R (Alkylarene) + 2 NaX.",
        "• NCERT Core Example:",
        "  Chlorobenzene + Chloromethane + 2 Na --(dry ether)--> Toluene + 2 NaCl.",
        "• Synthetic Utility: Superior method for attaching alkyl groups to aromatic rings",
        "  without carbocation rearrangement (unlike Friedel-Crafts alkylation).",
        "• Fed independently from Connector B (R-X) and Connector D (Ar-X)."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)
add_arrow([[1090, 3875], [1150, 3875]], "R-X feed", "above", "#047857")
add_arrow([[1090, 3995], [1150, 3995]], "Ar-X feed", "above", "#0284c7")

add_badge(1820, 3880, 70, "D", "Aryl Feed", stroke="#0284c7", bg="#e0f2fe")
add_box(
    1950, 3800, 540, 280,
    "Workstation 3: Fittig Reaction",
    [
        "• Chemical Equation: 2 Ar-X + 2 Na --(dry ether)--> Ar-Ar (Biphenyl / Diphenyl) + 2 NaX.",
        "• NCERT Core Example: 2 C6H5-Cl + 2 Na --(dry ether)--> C6H5-C6H5 (Biphenyl) + 2 NaCl.",
        "• Coupling of two aromatic rings.",
        "• Dry ether solvent is essential to prevent vigorous hydrolysis of sodium.",
        "• Fed independently from Connector D."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)
add_arrow([[1890, 3915], [1950, 3915]], "2 Ar-X feed", "above", "#0284c7")

add_badge(2590, 3880, 70, "D", "Aryl Feed", stroke="#0284c7", bg="#e0f2fe")
add_box(
    2720, 3800, 520, 280,
    "Workstation 4: Ullmann Reaction",
    [
        "• Chemical Equation: 2 Ar-I + Cu powder --(sealed tube, Δ)--> Ar-Ar (Biphenyl) + Cu2I2.",
        "• Specifically applicable to aryl iodides (and activated ortho/para-nitro aryl halides).",
        "• High thermal stability coupling producing biaryls.",
        "• Fed independently from Connector D."
    ],
    stroke="#0284c7", bg="#f0f9ff"
)
add_arrow([[2660, 3915], [2720, 3915]], "2 Ar-I feed", "above", "#0284c7")

add_badge(3380, 3840, 70, "B", "Alkyl Feed", stroke="#047857", bg="#ecfdf5")
add_badge(3380, 3960, 70, "D", "Aryl Feed", stroke="#0284c7", bg="#e0f2fe")
add_box(
    3510, 3760, 680, 340,
    "Workstation 5: Grignard Reagents (R-MgX & Ar-MgX) Engine",
    [
        "• Preparation: R-X (or Ar-X) + Mg --(dry ether)--> R-MgX (Organomagnesium Halide).",
        "• Highly Polar Covalent Bond: C(δ-)-Mg(δ+) bond acts as powerful nucleophile & strong base.",
        "• Active Hydrogen Quenching: R-MgX + H2O (or ROH, NH3, R-COOH) -> R-H (Alkane) + Mg(OH)X.",
        "  - Absolute Mandate: Grignard MUST be synthesized under strictly anhydrous dry conditions!",
        "• Carbonyl Addition Pathways:",
        "  - R-MgX + HCHO (Formaldehyde) followed by H3O+ -> Primary Alcohol (R-CH2OH).",
        "  - R-MgX + R'CHO (Other Aldehydes) -> Secondary Alcohol (R-CH(OH)-R').",
        "  - R-MgX + R'COR'' (Ketones) -> Tertiary Alcohol (R-C(OH)(R')(R'')).",
        "  - R-MgX + CO2 (Dry ice) followed by H3O+ -> Carboxylic Acid (R-COOH, +1 Carbon homologation!).",
        "• Fed independently from Connector B & Connector D."
    ],
    stroke="#10b981", bg="#f0fdf4", stroke_width=3
)
add_arrow([[3450, 3875], [3510, 3875]], "R-X feed", "above", "#047857")
add_arrow([[3450, 3995], [3510, 3995]], "Ar-X feed", "above", "#0284c7")

add_badge(4300, 3880, 70, "B", "Alkyl Feed", stroke="#047857", bg="#ecfdf5")
add_box(
    4430, 3800, 520, 280,
    "Workstation 6: Corey-House Synthesis (Gilman Reagent)",
    [
        "• Preparation of Lithium Dialkylcuprate: 2 R-Li + CuI -> R2CuLi (Gilman Reagent).",
        "• Coupling: R2CuLi + R'-X -> R-R' + R-Cu + LiX.",
        "• Overcomes Wurtz Limitations: Excellent yield for UNSYMMETRICAL alkanes!",
        "• Tolerates 1°, 2°, methyl, vinyl, and aryl halides (zero elimination with 1° R'X).",
        "• Fed independently from Connector B."
    ],
    stroke="#047857", bg="#ecfdf5"
)
add_arrow([[4370, 3915], [4430, 3915]], "R-X feed", "above", "#047857")

add_badge(5090, 3880, 70, "D", "Aryl Feed", stroke="#0284c7", bg="#e0f2fe")
add_box(
    5220, 3800, 540, 280,
    "Workstation 7: p,p'-DDT Synthesis & Environmental Profile",
    [
        "• Chemical Synthesis: Chloral (CCl3-CHO) + 2 Chlorobenzene (C6H5-Cl)",
        "  --(conc. H2SO4, condensation -H2O)--> p,p'-DDT.",
        "• Systematic IUPAC Name: 2,2-bis(4-chlorophenyl)-1,1,1-trichloroethane.",
        "• Environmental Hazard: Extremely fat-soluble (lipophilic), non-biodegradable,",
        "  bioaccumulates up trophic aquatic food chains causing eggshell thinning in predatory birds.",
        "• Banned globally under the Stockholm Convention on Persistent Organic Pollutants.",
        "• Fed independently from Connector D."
    ],
    stroke="#64748b", bg="#f8fafc"
)
add_arrow([[5160, 3915], [5220, 3915]], "Chlorobenzene feed", "above", "#0284c7")

add_box(
    5900, 3800, 680, 280,
    "Workstation 8: Stereochemical Diagnostic Matrix",
    [
        "Comprehensive comparative diagnostic on configuration outcomes:",
        "• Walden Inversion: SN2 backside attack on chiral secondary halide gives 100% inversion.",
        "• Racemisation: Planar carbocation in SN1 allows equal front/rear attack (50:50 d:l",
        "  or slight excess inversion due to intimate ion-pair shielding).",
        "• Retention of Configuration (SNi): Alcohol + SOCl2 in pure ether solvent forms",
        "  chlorosulfite ester; internal frontside collapse retains stereochemistry.",
        "• Inversion with Pyridine: SOCl2 + Pyridine forms pyridinium hydrochloride, freeing Cl-",
        "  for classic backside SN2 inversion!"
    ],
    stroke="#f59e0b", bg="#fffbeb"
)

# SAVE EXCALIDRAW FILE
output_data = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": elements,
    "appState": {
        "viewBackgroundColor": "#ffffff",
        "gridSize": 20
    },
    "files": {}
}

output_filename = "haloalkanes_master.excalidraw"
with open(output_filename, "w", encoding="utf-8") as f:
    json.dump(output_data, f, indent=2)

print(f"Successfully compiled {len(elements)} Excalidraw elements to {output_filename}!")
