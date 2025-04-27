import { readFileSync, writeFileSync } from "fs";

// Constants for PE header
const PE_SIGNATURE = 0x00004550; // "PE\0\0"
const IMAGE_SUBSYSTEM_WINDOWS_GUI = 2; // Subsystem type for Windows GUI

function modifyExeSubsystem(filePath: string) {
    // Read the executable file
    const exeBuffer = readFileSync(filePath);

    // Check for PE signature
    const dosHeader = exeBuffer.subarray(0, 64);
    const peOffset = dosHeader.readUInt32LE(60);
    const peHeader = exeBuffer.subarray(peOffset, peOffset + 4);

    if (peHeader.readUInt32LE(0) !== PE_SIGNATURE) {
        throw new Error("Not a valid PE file");
    }

    // Locate the subsystem field in the PE header
    const subsystemOffset = peOffset + 0x5C; // Subsystem is at offset 0x5C from PE header
    const currentSubsystem = exeBuffer.readUInt16LE(subsystemOffset);

    console.log(`Current Subsystem: ${currentSubsystem}`);

    // Modify the subsystem to Windows GUI
    exeBuffer.writeUInt16LE(IMAGE_SUBSYSTEM_WINDOWS_GUI, subsystemOffset);

    // Write the modified buffer back to the file
    writeFileSync(filePath, exeBuffer);
    console.log("Subsystem modified to Windows GUI.");
}

const exeFilePath = prompt("Path to exe:");
if (!exeFilePath) throw new Error("no path given");

try {
    modifyExeSubsystem(exeFilePath);
} catch (error) {
    console.error("Error modifying EXE subsystem:\n", error);
}
