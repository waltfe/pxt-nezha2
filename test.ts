input.onButtonPressed(Button.A, function () {
    NEHZAV2.goToAbsolutePosition(MotorPostion.M1, ServoMotionMode.ShortestPath, 180)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M2, ServoMotionMode.ShortestPath, 180)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M3, ServoMotionMode.ShortestPath, 180)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M4, ServoMotionMode.ShortestPath, 180)
})
input.onButtonPressed(Button.B, function () {
    NEHZAV2.goToAbsolutePosition(MotorPostion.M1, ServoMotionMode.ShortestPath, 0)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M2, ServoMotionMode.ShortestPath, 0)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M3, ServoMotionMode.ShortestPath, 0)
    NEHZAV2.goToAbsolutePosition(MotorPostion.M4, ServoMotionMode.ShortestPath, 0)
})
