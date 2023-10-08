const GPT_MODEL = 'ft:gpt-3.5-turbo-0613:personal::87BBpzgT';
const GPT_MODEL_D = "gpt-3.5-turbo-0613";
// Replace with your fine-tuned model ID
const inputString69 = `NASA-HDBK-4007 W/CHANGE 1 
APPROVED FOR PUBLIC RELEASE—DISTRIBUTION IS UNLIMITED

Page 19 of 147
Permittivity: The ratio of the flux density produced by an electric field in a given dielectric
to the flux density produced by that field in a vacuum.

Petticoat Insulator:  An insulator made in the form 
of superposed inverted cups and used
for high voltage insulation

Plasma: A gaseous body of ions and electrons of sufficiently low density that considerable
charge separation is possible. Note: Because of the 
mobility of charge, a plasma is normally
neutral and free of electric field in its interior, 
just like a metallic conductor.

Polyamide: A polymer in which the structural units are linked by amide or thioamide
groupings.

Polystyrene: A thermoplastic material produced by the polymerization of styrene (vinyl
benzene).
Potting: A process similar to encapsulating, except 
that steps are taken to ensure complete
penetration of all voids in the object before the resin polymerizes.

Power Factor: The ratio of the average (or active) power to the apparent power (rms
voltage times rms current) of an ac circuit. Also known as phase factor.

Pulse: A wave that departs from a first nominal state, attains a second nominal state, and
ultimately returns to the first nominal state.      

Resin: An organic substance of natural or synthetic 
origin characterized by being
polymeric in structure and predominantly amorphous. 
Note: Most resins, though not all, are of
high molecular weight and consist of a long chain or network molecular structure. Usually, resins       
are more soluble in their lower molecular weight forms.

Resistance: The property of a conductor that determines the current produced by a given
difference of potential. Note: The ohm is the SI derived unit of resistance.

Resistivity: The ability of a material to resist passage of electrical current either through its       
bulk or on a surface. Note: The unit of volume resistivity is the ohm-centimeter.

Semiconductor: A solid substance whose electrical conductivity is intermediate between
that of insulators and conductors. The conductivity 
of a semiconductor is often tailored through        
the addition of impurities and is usually dependent 
on applied electric or magnetic fields or by        
temperature effects.

Seta, plural: setae – very small, stiff hair like structures that can form on the surfaces of
materials. If the surface is electrically charged, a seta results in very high electric field
concentration, sometimes leading to electrical breakdown.`; // Replace with the first string you want to compare
const inputString1 = `NASA-HDBK-4007 W/CHANGE 1 


APPROVED FOR PUBLIC RELEASE—DISTRIBUTION IS UNLIMITED

Page 12 of 147
SPACECRAFT HIGH-VOLTAGE PASCHEN
AND CORONA DESIGN HANDBOOK

 SCOPE

This NASA Technical Handbook presents an overview of the current understanding of the
electrical design techniques that can mitigate deleterious effects (such as Paschen and corona
discharges) resulting from operation of a high-voltage system in space, references common
design practices that have been successful in mitigating these effects in the past, and
recommends standard practices to eliminate or mitigate such effects in the future.

 Purpose

The purpose of this NASA Technical Handbook is to present an overview of high-voltage
electrical/electronic design techniques required to 
specify and apply electrical insulation to
spacecraft high-voltage parts, components, and systems. Of particular interest are spacecraft
system designs that are needed to meet stringent fault-free operation for a period of days to years     
in space without maintenance. The first objective is to develop an understanding of electrical
insulation characteristics and the influence of aging. A second objective is to capture decades of      
lessons learned and present recommended design, analysis, and test methodologies that have
been applied to the many successful space vehicle electronic programs during their development,
manufacture, final assembly, test, and flight.      

 Applicability

This NASA Technical Handbook is applicable to all high-voltage power systems that operate in
space. It is not intended to replace the following low Earth orbit or geosynchronous Earth orbit        
spacecraft charging standards or handbooks: NASA-STD-4005, Low Earth Orbit Spacecraft
Charging Design Standard; NASA-HDBK-4006, Low Earth 
Orbit Spacecraft Charging Design
Handbook; ISO-11221, Space Systems–Space Solar Panels–Spacecraft Charging Induced
Electrostatic Discharge Test Methods; and NASA HDBK 
4002A, Mitigating In-Space Charging
Effects—A Guideline. Rather, this NASA Technical Handbook is to complement them to
provide for better interior spacecraft high-voltage 
designs that would prevent Paschen and/or
corona discharges, not to deal with plasma interactions that are the purview of other documents.        

This NASA Technical Handbook is approved for use by 
NASA Headquarters and NASA
Centers, including Component Facilities and Technical and Service Support Centers. It may also
apply to the Jet Propulsion Laboratory or to other contractors, grant recipients, or parties to
agreements only to the extent specified or referenced in their contracts, grants, or agreements.        

This NASA Technical Handbook, or portions thereof, may be referenced in contract, program,
and other Agency documents for guidance. When it contains procedural or process requirements,
they may be cited in contract, program, and other Agency documents.

NASA-HDBK-4007 W/CHANGE 1


APPROVED FOR PUBLIC RELEASE—DISTRIBUTION IS UNLIMITED

Page 13 of 147
 APPLICABLE DOCUMENTS

 General

The documents listed in this section are applicable 
to the guidance in this NASA Technical
Handbook.

2.1.1 The latest issuances of cited documents shall 
apply unless specific versions are
designated.

2.1.2 Non-use of specific versions as designated shall be approved by the responsible
Technical Authority.

The applicable documents are accessible at https://standards.nasa.gov or may be obtained
directly from the Standards Developing Body or other document distributors.

 Government Documents

 Department of Defense

AFWAL-TR-88-4143 Design Guide: Designing and Building High Voltage
Power Supplies, Materials Laboratory, Volumes I and 
II

 NASA

NASA-HDBK-4006 Low Earth Orbit Spacecraft Charging Design Handbook

NASA-STD-4005 Low Earth Orbit Spacecraft Charging Design Standard

NASA-HDBK-4002A
Mitigating In-Space Charging Effects—A Guideline    

 Non-Government Documents

 ASTM International

ASTM D257 Standard Test Methods for DC Resistance or Conductance
of Insulating Materials

 Order of Precedence

This NASA Technical Handbook provides guidance for high-voltage electrical/electronic design
techniques but does not supersede nor waive established Agency requirements/guidance found in
other documentation.`
const inputString2 = `Thick Dielectric Charging/Internal Electrostatic Discharge (IESD)Source: Lessons learned ID 65210f10899abed56392edb6, title: Thick Dielectric Charging/Internal Electrostatic Discharge (IESD)Permeability, Swelling and Solvent-Stress-Cracking Polymeric and Elastomeric Materials (1977)Source: Lessons learned ID 65210fd8899abed56392ef42, title: Permeability, Swelling and Solvent-Stress-Cracking Polymeric and Elastomeric Materials (1977)Surface Charging/Electrostatic Discharge AnalysisSource: Lessons learned ID 65210f78899abed56392ee75, title: Surface Charging/Electrostatic Discharge AnalysisHigh Voltage Electric CircuitsSource: Lessons learned ID 65210f5d899abed56392ee3c, title: High Voltage Electric CircuitsHigh Voltage Electric CircuitsSource: Lessons learned ID 65210fba899abed56392ef04, title: High Voltage Electric CircuitsPenetrant Testing of Aerospace MaterialsSource: Lessons learned ID 65211016899abed56392efc3, title: Penetrant Testing of Aerospace MaterialsHigh Electrical CurrentSource: Lessons learned ID 65210f5f899abed56392ee40, title: High Electrical CurrentAssessment and Control of Electrical ChargesSource: Lessons learned ID 65210f74899abed56392ee6d, title: Assessment and Control of Electrical ChargesEddy Current Testing of Aerospace MaterialsSource: Lessons learned ID 65211046899abed56392f02a, title: Eddy Current Testing 
of Aerospace MaterialsSolid Propellant, Electro-Static Discharge IgnitionSource: Lessons learned ID 65210fea899abed56392ef66, title: Solid Propellant, Electro-Static Discharge IgnitionElectrical Shielding of 
Power, Signal and Control CablesSource: Lessons learned ID 65210fe5899abed56392ef5d, title: Electrical Shielding of Power, Signal and Control CablesIncreasing ESD Susceptibility of Integrated Circuits (2002)Source: Lessons learned ID 65211071899abed56392f086, 
title: Increasing ESD Susceptibility of Integrated Circuits (2002)Insulation, Solid Rocket Motor Case, Bonding, Effect of ContaminationSource: Lessons learned ID 65211000899abed56392ef94, title: Insulation, Solid Rocket Motor Case, Bonding, Effect of ContaminationLimitations of material procurement specifications in polytetrafluoroethylene (PTFE) resin selectionSource: Lessons learned ID 652110a1899abed56392f0f0, title: Limitations of material procurement specifications in polytetrafluoroethylene (PTFE) resin selectionPart Electrical Stress AnalysisSource: Lessons learned ID 65210e6a899abed56392ec5b, title: Part Electrical Stress AnalysisMagnetic Particle Testing of Aerospace MaterialsSource: Lessons learned ID 65210e73899abed56392ec76, title: Magnetic Particle Testing 
of Aerospace MaterialsReliance on Part Hermeticity and Residual Gas Analysis on GOES-R Bipolar Junction 
TransistorsSource: Lessons learned ID 65211244899abed56392f447, title: Reliance on Part Hermeticity and 
Residual Gas Analysis on GOES-R Bipolar Junction TransistorsDesign Practice to Control Interference from Electrostatic Discharge (ESD)Source: Lessons learned ID 65210eaa899abed56392ecdc, title: Design Practice to Control Interference from Electrostatic Discharge (ESD)Electrical Equipment Protection From Liquid 
IntrusionSource: Lessons learned ID 65210e7e899abed56392ec8a, title: Electrical Equipment Protection From Liquid IntrusionConformal Coating as Moisture Protection of Electronic Circuitry in Micro GravitySource: Lessons learned ID 65210f69899abed56392ee55, title: Conformal Coating as Moisture Protection of Electronic Circuitry in Micro GravityConductive Polyimide Tape and Nickel Alloy Foils Can Become MagnetizedSource: Lessons learned ID 65211240899abed56392f43f, title: Conductive Polyimide Tape and Nickel Alloy Foils Can Become MagnetizedConfiguration control of electrical conductors during facilities installationsSource: Lessons learned ID 65211125899abed56392f20b, title: Configuration control of electrical conductors during facilities installationsElectrostatic Discharge (ESD) Test PracticesSource: Lessons learned ID 65210fbc899abed56392ef08, title: Electrostatic Discharge (ESD) Test PracticesWorking in the Proximity of 
Energized Electrical SourcesSource: Lessons learned 
ID 65210f6a899abed56392ee57, title: Working in the Proximity of Energized Electrical SourcesHigh-voltage Capacitor Used in Voltage Doubler Circuits for Space Applications (~1978)Source: Lessons learned ID 65210fc5899abed56392ef1a, title: High-voltage Capacitor Used in Voltage Doubler Circuits for Space Applications (~1978)Plasma Noise in EMI DesignSource: Lessons learned ID 65210e63899abed56392ec4c, title: Plasma Noise in EMI DesignPenetrant Evaluation of Metallic Tanks and Composite Overwrapped Pressure Vessel LinersSource: Lessons learned ID 6521119f899abed56392f2f1, title: Penetrant Evaluation of Metallic Tanks and Composite Overwrapped Pressure Vessel LinersProtect Against Corona Discharge and High Voltage Breakdown (1960's-Present)Source: Lessons learned ID 65210f92899abed56392eeae, title: Protect Against Corona Discharge and High Voltage Breakdown (1960's-Present)Microchip Susceptibility to Ionizing Radiation Emitted by Environment, Materials Used in Production and Processing of Computer HardwareSource: Lessons learned ID 6521103b899abed56392f013, title: Microchip Susceptibility to Ionizing Radiation Emitted by Environment, Materials Used in Production and Processing of Computer HardwareRadiographic Testing of Aerospace MaterialsSource: Lessons learned ID 65210f93899abed56392eeb0, title: Radiographic Testing of Aerospace MaterialsDimensional stability of dissimilar materials 
in operational and non-operational environments where excessive or unintentional heating may occurSource: Lessons learned ID 652110ff899abed56392f1bb, title: Dimensional stability of dissimilar materials in operational and non-operational environments where excessive or unintentional heating may occurSolid Propellant in Contact with Porous Material, FireSource: 
Lessons learned ID 65210eea899abed56392ed66, title: 
Solid Propellant in Contact with Porous Material, FireCautions Involving Ceramic CapacitorsSource: Lessons learned ID 65211242899abed56392f442, title: Cautions Involving Ceramic CapacitorsSneak Circuitry; Down Range Control Area; Electrical Ground Connections 
for Folding Fin Aircraft Rockets (FFAR); Corrosion of Dissimilar MetalsSource: Lessons learned ID 65210f1c899abed56392edce, title: Sneak Circuitry; Down Range Control Area; Electrical Ground Connections for Folding Fin Aircraft Rockets (FFAR); Corrosion of Dissimilar MetalsElectrical Ground - U-GroundSource: Lessons learned ID 65210f48899abed56392ee0f, title: Electrical Ground - U-GroundHigh electrical resistance from loose connectorsSource: Lessons learned ID 65210f9f899abed56392eec7, title: High electrical resistance from loose connectorsElectromagnetic Interference Analysis of Circuit TransientsSource: Lessons learned ID 65210fb0899abed56392eeeb, title: Electromagnetic Interference Analysis of Circuit TransientsSpacecraft Single Phase AC Electrical PowerSource: Lessons learned ID 652111cf899abed56392f350, title: Spacecraft Single Phase AC Electrical PowerHigh Voltage Power Supply Design and Manufacturing PracticesSource: Lessons learned ID 65210f61899abed56392ee45, title: High Voltage Power Supply Design and Manufacturing PracticesConducted and Radiated Emissions Design RequirementsSource: Lessons learned ID 65210ea2899abed56392eccd, title: Conducted and Radiated Emissions Design RequirementsDesign, Test, and Inspection of Semi-Rigid RF Cables (1997)Source: Lessons learned ID 
65210f22899abed56392edd9, title: Design, Test, and Inspection of Semi-Rigid RF Cables (1997)International Space Station (ISS) Program/Microgravity Science Glovebox (MSG)/Solidification Using a Baffled Sample 
Ampoule (SUBSA) Investigation Eurotherm Controller AnomalySource: Lessons learned ID 652110b7899abed56392f11f, title: International Space Station (ISS) Program/Microgravity Science Glovebox (MSG)/Solidification Using a Baffled Sample Ampoule (SUBSA) Investigation Eurotherm Controller AnomalyMagnetic Fie`; // Replace with the second string for comparison
const axios = require('axios');


// Function to ask the fine-tuned model for recommendations
async function compareAndRecommend(model, string1, string2) {
  try {
    const messages = [
      { role: 'system', content: 'Compare two texts and provide recommendations for how to improve the first text based on the information given in the second text.' },
      { role: 'user', content: string1 },
      { role: 'assistant', content: string2 },
    ];

    const response = await openaiChatCompletion(GPT_MODEL_D, messages);

    // Get answer1 from combineAndOutput
    const answer1 = await combineAndOutput(model, string1, response.choices[0].message.content);

    // Get answer2 from checkForProblem
    const answer2 = await checkForProblem(model, string1, answer1);

    // Ensure that answer1 is a string
    const answer1String = String(answer1);

    const answer2String = String(answer2);

    // Use the replace() method with a regular expression to replace all occurrences
    const finalAnswer = answer1String.replace(/\[ISSUE\]/g, answer2String);


    console.log(finalAnswer)
    return finalAnswer;
    
  } catch (error) {
    console.error('An error occurred during the API request:', error);
    throw error; // Rethrow the error for further handling or debugging.
  }
}

async function checkForProblem(model, string1, answer1) {
  const messages = [
    { role: 'system', content: "" },
    { role: 'user', content: `Use the provided fixes from the text "${answer1}" to find text that can be improved by this fix in "${string1}". Output one example.`},
  ];

  const response = await openaiChatCompletion(GPT_MODEL_D, messages);
  console.log(response.choices[0].message.content)

  const teikums = response.choices[0].message.content

  const regex = /"(.*?)"/g;

// Extract text inside double apostrophes
const matches = teikums.match(regex);

var extractedText = "";

// Print the extracted text
if (matches) {
  for (const match of matches) {
    // Remove the double apostrophes from the extracted text
    extractedText = match.slice(1, -1);
    // console.log(extractedText);
  }
}
  return extractedText;

}


async function combineAndOutput(model, string1, recommendation){
  const messages = [
    { role: 'system', content: "You are an AI tool that gets string type input and checks if it has old data or issues based on given context that will be fed into you, your task is to find the issue within the given text and suggest a fix based on the given context sources in this format: issue_P_ [ISSUE]; fix_P_ [FIX]; source_P_ [SRC]; priority_P_ [PR]; problem_P_ [PRB]..  In the [ISSUE] field of the output, you display the string with the problem that you found in the input string by using the given sources. In the [FIX] field of the output, you display a possible fix to the issue based on the given sources. In the [SRC] field of the output, you display the source of the context you used to find the solution to the problem from the given context files. In the [PR] field of the output, you display the priority of the fix, if the fix is related to changes shown in the context file and are possibly dangerous to humans or could be of high importance show high priority, If there is no danger to human life but the issue is in context files, put out  priority_P_ MEDIUM priority, If the problem doesn't appear in the context files and isn't a threat to human life but the context of the wording is too broad, output a low priority. Show output only after getting all the required information based on the context. In the [ISSUE] field of the output, you output the problem that's defined using the information about the issue and the fix." },
    { role: 'user', content: `Output information using "${recommendation}" as a recommendation and "${string1}" for other information. Fill out the rest yourself basing your opinion on the two given inputs.` },
  ];

  const response = await openaiChatCompletion(model, messages);

  // console.log(response.choices[0].message.content)

  return response.choices[0].message.content;
}

// Function to send a message to the OpenAI Chat Completion API
async function openaiChatCompletion(model, messages) {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model,
    messages,
    temperature: 0,
  }, {
    headers: {
      'Authorization': 'Bearer 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', // Replace with your actual API key
    },
  });

  return response.data;
}

// Example usage
// Example usage
async function main() {
  const recommendations = await compareAndRecommend(GPT_MODEL, inputString1, inputString2);
  // console.log(recommendations);
}

main(); // Call the async function
