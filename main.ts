// When the log is full turn on all LEDs
datalogger.onLogFull(function () {
    startLog = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
// Start logging on button A
input.onButtonPressed(Button.A, function () {
    startLog = true
})
// Perform a full delete on button B (removing data and MY_DATA file from drive)
input.onButtonPressed(Button.B, function () {
    datalogger.deleteLog(datalogger.DeleteType.Full)
})
/**
 * Program that runs through the data logging blocks and logs some sensor data.
 * 
 * 1. Press B to perform a full erase.
 * 
 * 2. Once erase is complete, Press A to start logging.
 * 
 * 3. When log is full, disconnect and reconnect USB and verify MY_DATA.htm on
 * 
 * micro:bit drive.
 * 
 * 4. Repeat test for on battery, webUSB and drag and drop.
 * 
 * 5. Test without waiting for log to fill and with a fast erase
 * 
 * (flashing via USB performs a fast erase). Previous data should be invalidated
 * 
 * and not visible in MY_DATA.htm
 */
let startLog = false
startLog = false
// Mirror the log to the serial console. Test this in WebUSB or using a console
// tool like Coolterm
datalogger.mirrorToSerial(true)
// add a timestamp to the log with the 'Minutes' format
datalogger.includeTimestamp(FlashLogTimeStampFormat.Minutes)
// Set 5 columns labelled x, y, z, and light.
datalogger.setColumns([
"x",
"y",
"z",
"light"
])
// Log new data every 50 milli-seconds
loops.everyInterval(50, function () {
    if (startLog) {
        datalogger.logData([
        datalogger.createCV("x", input.acceleration(Dimension.X)),
        datalogger.createCV("y", input.acceleration(Dimension.Y)),
        datalogger.createCV("z", input.acceleration(Dimension.Z)),
        datalogger.createCV("light", input.lightLevel()),
        datalogger.createCV("temp", input.temperature())
        ])
    }
})
