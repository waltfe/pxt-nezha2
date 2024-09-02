// When the logo button is pressed, perform the following actions
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    // Stop NezhaV2 motor M1
    nezhaV2.nezha2MotorStop(MotorPostion.M1)
    // Reset the position of NezhaV2 motor M1
    nezhaV2.servoPostionReset(MotorPostion.M1)
})

// When button A is pressed, perform the following actions
input.onButtonPressed(Button.A, function () {
    // Set the speed of NezhaV2 motor M1 to 0 degrees/second, in clockwise direction, using degrees as the unit
    nezhaV2.motorSpeed(MotorPostion.M1, NezhaV2MovementDirection.CW, 0, NezhaV2SportsMode.Degree)
    // Move NezhaV2 motor M1 to the absolute position 0, in clockwise direction
    nezhaV2.goToAbsolutePosition(MotorPostion.M1, NezhaV2MovementDirection.CW, 0)
    // Start NezhaV2 motor M1, in clockwise direction
    nezhaV2.nezha2MotorStart(MotorPostion.M1, NezhaV2MovementDirection.CW)
    // Set the speed control output of NezhaV2 motor M1 to 66 (assuming this is a valid value for speed control)
    nezhaV2.nezha2MotorSpeedCtrolExport(MotorPostion.M1, 66)
    // Display the current absolute position of NezhaV2 motor M1
    basic.showNumber(nezhaV2.readServoAbsolutePostion(MotorPostion.M1))
    // Display the current absolute speed of NezhaV2 motor M1
    // Note: The closing parenthesis for the previous line was missing, added it here
    basic.showNumber(nezhaV2.readServoAbsoluteSpeed(MotorPostion.M1))
})