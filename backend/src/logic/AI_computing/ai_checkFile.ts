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

Page 22 of 147

e. “Insulation systems” may consist of one or more materials or classes of materials
used to electrically isolate two or more conducting 
surfaces.

f. “Partial discharge” is an electrical discharge that does not bridge the electrodes, such
as internal discharges in the cavities within the solid dielectric, surface discharges along the        
surface of insulator, and corona discharges around a sharp edge (usually around the electrode
surface). Usually, the magnitude of such discharges 
is small; however, they may cause
progressive deterioration of the insulation and lead to ultimate failure.

g. “Pure air”: The composition of air is variable with respect to several of its
components (e.g. CH
4
, CO
2
, H
2
O) so 'pure' air has no precise meaning. The composition of the
major components in dry air is relatively constant (percent by volume given): nitrogen, 78.084;
oxygen, 20.946; argon, 0.934; carbon dioxide, 0.033; neon, 0.0018; helium, 0.000524; methane,
0.00016; krypton, 0.000114; hydrogen 0.00005; nitrous oxide, 0.00003; xenon, 0.0000087. The
concentrations of carbon dioxide, methane, nitrous oxide, the chlorofluorocarbons and some
other species of anthropogenic origin are increasing measurably with time. For purposes of this
document, “pure air” is assumed to consist of such a mixture that is free of any contaminant that       
could possibly alter its electrical or dielectric behavior.

For early spacecraft missions, techniques were developed for the detection of partial discharges        
in spacecraft electronic equipment. Use of these techniques clearly showed that the reduction of        
partial discharges enhanced equipment life, and thereafter testing incorporating such techniques        
made mandatory to eliminate faulty insulation and flawed workmanship. Some examples of
representative instrumentation and test techniques, 
both of which have matured and improved
over time, are described later in this NASA Technical Handbook.

In the modern spacecraft electronics industry, dense packaging is required to make the
equipment fit within a restricted volume. Likewise, 
weight is restricted to economize on fuel and       
maximize space for the payload. Consequently, high electrical field stresses, which enhance
partial discharge activity, are often present. Such 
partial discharge activities can be a contributing  
factor in insulation degradation.

Continuous partial discharge or corona activities are a serious problem usually associated with
insulation degradation, electromagnetic interference (EMI), and the upset of poorly protected
sensitive circuits without proper shielding or noise suppression. Insulated conductors may be
highly susceptible to continuous corona or partial discharges when operated at very low pressure        
gaseous environments, because the corona, or breakdown initiation voltage, is a function of both        
the density and content of the gaseous environment. 
For example, helium has a much lower
breakdown voltage at low pressures than air or nitrogen. The insulated and non-insulated
conductors, terminations, and other electrical/electronic parts may be susceptible to this
phenomenon in the high field stresses caused by the 
dense population of parts within the system
design. Some insulation systems, however, can endure partial discharge or corona activities for
microseconds to milliseconds, for thousands of repetitive occurrences, as experienced with pulse        
power applications.`
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
export async function compareAndRecommend(model: string, string1: string, string2: string) {
  try {
    const messages = [
      { role: 'system', content: 'Compare two texts and provide recommendations for how to improve the first text based on the information given in the second text.' },
      { role: 'user', content: string1 },
      { role: 'assistant', content: string2 },
    ];

    const response = await openaiChatCompletion(GPT_MODEL, messages);

    // Get answer1 from combineAndOutput
    const answer1 = await combineAndOutput(model, string1, response.choices[0].message.content);

    // Get answer2 from checkForProblem
    const answer2 = await checkForProblem(GPT_MODEL_D, string1, answer1);

    // Ensure that answer1 is a string
    const answer1String = String(answer1);

    const answer2String = String(answer2);

    // Use the replace() method with a regular expression to replace all occurrences
    const finalAnswer = answer1String.replace("[ISSUE]", answer2String);

    console.log("answer2: " + answer2);
    console.log("final answer: "+ finalAnswer);
    return finalAnswer;
    
  } catch (error) {
    console.error('An error occurred during the API request:', error);
    throw error; // Rethrow the error for further handling or debugging.
  }
}

async function checkForProblem(model: string, string1: string, answer1: string) {
  const messages = [
    { role: 'system', content: "" },
    { role: 'user', content: `Use the provided fixes from the text "${answer1}" to find text that can be improved by this fix in "${string1}". Output one example.`},
  ];

  const response = await openaiChatCompletion(model, messages);
  // console.log(response.choices[0].message.content)

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




async function combineAndOutput(model: string, string1: string, recommendation: string){
  const messages = [
    { role: 'system', content: "You are an AI tool that gets string type input and checks if it has old data or issues based on given context that will be fed into you, your task is to find the issue within the given text and suggest a fix based on the given context sources in this format: issue_P_ [ISSUE]; fix_P_ [FIX]; source_P_ [SRC]; priority_P_ [PR]; problem_P_ [PRB]..  In the [ISSUE] field of the output, you display the string with the problem that you found in the input string by using the given sources. In the [FIX] field of the output, you display a possible fix to the issue based on the given sources. In the [SRC] field of the output, you display the source of the context you used to find the solution to the problem from the given context files. In the [PR] field of the output, you display the priority of the fix, if the fix is related to changes shown in the context file and are possibly dangerous to humans or could be of high importance show high priority, If there is no danger to human life but the issue is in context files, put out  priority_P_ MEDIUM priority, If the problem doesn't appear in the context files and isn't a threat to human life but the context of the wording is too broad, output a low priority. Show output only after getting all the required information based on the context. In the [ISSUE] field of the output, you output the problem that's defined using the information about the issue and the fix." },
    { role: 'user', content: `Output information using "${recommendation}" as a recommendation and "${string1}" for other information. Fill out the rest yourself basing your opinion on the two given inputs.` },
  ];

  const response = await openaiChatCompletion(model, messages);

  // console.log(response.choices[0].message.content)

  return response.choices[0].message.content;
}

// Function to send a message to the OpenAI Chat Completion API
async function openaiChatCompletion(model: string, messages: {role: string, content: string}[]) {
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

// // Example usage
// // Example usage
// async function main() {
//   const recommendations = await compareAndRecommend(GPT_MODEL, inputString1, inputString2);
//   // console.log(recommendations);
// }

// main(); // Call the async function
