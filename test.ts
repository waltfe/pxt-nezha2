input.onButtonPressed(Button.A, function () {
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M1, NezhaV2MovementDirection.CCW, 180)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M2, NezhaV2MovementDirection.CCW, 180)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M3, NezhaV2MovementDirection.CCW, 180)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CCW, 180)
})
input.onButtonPressed(Button.B, function () {
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M1, NezhaV2MovementDirection.CW, 0)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M2, NezhaV2MovementDirection.CW, 0)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M3, NezhaV2MovementDirection.CW, 0)
    nezhaV2.goToAbsolutePosition(NezhaV2MotorPostion.M4, NezhaV2MovementDirection.CW, 0)
})
