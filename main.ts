    enum MotorPosition {
        //% block="A"
        M1 = 1,
        //% block="B"
        M2 = 2,
        //% block="C"
        M3 = 3,
        //% block="D"
        M4 = 4
    }

    enum MovementDirection {
        //% block="clockwise"
        CW = 1,
        //% block="counterclockwise"
        CCW = 2
    }

    enum SportsMode {
        //% block="degrees"
        DEGREE = 2,
        //% block="turns"
        TURN = 1,
        //% block="seconds"
        SECOND = 3
    }

    enum ServoMotionMode {
        //% block="clockwise"
        CW = 2,
        //% block="shortest path"
        SHORTEST_PATH = 1,
        //% block="counterclockwise"
        CCW = 3
    }

    enum HorizontalDirection {
        //% block="left"
        LEFT = 1,
        //% block="right"
        RIGHT = 2
    }

    enum VerticalDirection {
        //% block="forward"
        UP = 1,
        //% block="backward"
        DOWN = 2
    }

    enum Unit {
        //% block="cm"
        CM = 1,
        //% block="inch" // Corrected spelling from "irch" to "inch"
        INCH = 2
    }

const iicWaitTime = 0
//% color=#ff0011  icon="\uf06d" block="NEZHA_V2" blockId="NEZHA_V2"
namespace NezhaV2 {
    let i2cAddress: number = 0x10;
    let setMotorCombination: number = 0;
    let getMotorCombinationSpeed: number = 0;
    let motorSpeedGlobal: number = 0;

    let buffer = pins.createBuffer(8);
    buffer[0] = 0xFF;
    buffer[1] = 0xF9;
    buffer[2] = 0x00;
    buffer[3] = 0x00;
    buffer[4] = 0x00;
    buffer[5] = 0x00;
    buffer[6] = 0xF5;
    buffer[7] = 0x00;
    pins.i2cWriteBuffer(i2cAddress, buffer);

    //% group="Basic functions"
    //% block="Set %MotorPostion to run %MovementDirection %speed  %SportsMode"
    //% inlineInputMode=inline
    //% weight=407 
    export function setMotorSpeed(motorPosition: MotorPosition, movementDirection: MovementDirection, speed: number, motorFunction: SportsMode): void {
        let commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = motorPosition;
        commandBuffer[3] = movementDirection;
        commandBuffer[4] = 0x70;
        commandBuffer[5] = (speed >> 8) & 0xFF;
        commandBuffer[6] = motorFunction;
        commandBuffer[7] = (speed >> 0) & 0xFF;
        pins.i2cWriteBuffer(i2cAddress, commandBuffer);
    }

    //% group="Basic functions"
    //% weight=406
    //% block="Set %MotorPostion to rotate %ServoMotionMode at angle %target_angle"
    //% target_angle.min=0  target_angle.max=360
    export function goToAbsolutePosition(motorPosition: MotorPosition, motionMode: ServoMotionMode, targetAngle: number): void {
        while (targetAngle < 0) {
            targetAngle += 360;
        }
        targetAngle %= 360;
        
        const commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = motorPosition;
        commandBuffer[3] = 0x00; // Presuming this is a placeholder or specific command for servo control
        commandBuffer[4] = 0x5D; // Presuming this byte is part of the servo command structure
        commandBuffer[5] = (targetAngle >> 8) & 0xFF;
        commandBuffer[6] = motionMode;
        commandBuffer[7] = targetAngle & 0xFF;
        
        pins.i2cWriteBuffer(i2cAddress, commandBuffer);
        basic.pause(5); // Assuming a pause to allow the servo to reach position
    }

    //% group="Basic functions"
    //% weight=405
    //% block="Setting %MotorPostion to start the motor in %MovementDirection"
    //% speed.min=0  speed.max=100
    export function startMotor(motorPosition: MotorPosition, movementDirection: MovementDirection): void {
        const commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = motorPosition;
        commandBuffer[3] = movementDirection;
        commandBuffer[4] = 0x5E; 
        commandBuffer[5] = 0x00; 
        commandBuffer[6] = 0xF5; 
        commandBuffer[7] = 0x00; 
        pins.i2cWriteBuffer(i2cAddress, commandBuffer);
    }
    //% group="Basic functions"
    //% weight=404
    //% block="Set %MotorPostion shutting down the motor"
    //% speed.min=0  speed.max=100
    export function stopMotor(motorPosition: MotorPosition): void {
        const commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = motorPosition;
        commandBuffer[3] = 0x00; 
        commandBuffer[4] = 0x5F; 
        commandBuffer[5] = 0x00;
        commandBuffer[6] = 0xF5;
        commandBuffer[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddress, commandBuffer);
    }

    //% group="Basic functions"
    //% weight=403
    //% block="Set %MotorPostion speed to %speed\\%"
    //% speed.min=-100  speed.max=100
    export function controlMotorSpeed(motorPosition: MotorPosition, speedValue: number): void {
        const buffer = pins.createBuffer(8);
        buffer[0] = 0xFF;
        buffer[1] = 0xF9;
        buffer[2] = motorPosition;
        buffer[3] = speedValue > 0 ? MovementDirection.cw : MovementDirection.ccw;
        buffer[4] = 0x60;
        buffer[5] = Math.abs(speedValue);
        buffer[6] = 0xF5;
        buffer[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, buffer);
    }

    function setMotorSpeed(motorPosition: MotorPosition, movementDirection: MovementDirection, speedValue: number): void {
        const commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = motorPosition;
        commandBuffer[3] = movementDirection;
        commandBuffer[4] = 0x60;
        commandBuffer[5] = speedValue;
        commandBuffer[6] = 0xF5;
        commandBuffer[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, commandBuffer);
    }

    //% group="Basic functions"
    //% weight=402
    //%block="%MotorPostion Angular value"
    export function readServoPosition(motorPosition: MotorPosition): number {
        let command = pins.createBuffer(8);
        command[0] = 0xFF;
        command[1] = 0xF9;
        command[2] = motorPosition;
        command[3] = 0x00;
        command[4] = 0x46;
        command[5] = 0x00;
        command[6] = 0xF5;
        command[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, command);
        basic.pause(4);
        let data = pins.i2cReadBuffer(i2cAddr, 4);
        let pos = (data[3] << 24) | (data[2] << 16) | (data[1] << 8) | data[0];
        pos &= 0x7FFFFFFF;
        pos %= 3600;
        return pos * 0.1;
    }

    //% group="Basic functions"
    //% weight=400
    //%block="%MotorPostion Speed (laps/sec)"
    export function readServoSpeed(motorPosition: MotorPosition): number {
        let command = pins.createBuffer(8);
        command[0] = 0xFF;
        command[1] = 0xF9;
        command[2] = motorPosition;
        command[3] = 0x00;
        command[4] = 0x47;
        command[5] = 0x00;
        command[6] = 0xF5;
        command[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, command);
        basic.pause(3);
        let speedBytes = pins.i2cReadBuffer(i2cAddr, 2);
        let rawSpeed = (speedBytes[1] << 8) | speedBytes[0];
        return Math.floor(rawSpeed * 0.0926);
    }

    //% group="Basic functions"
    //% weight=399
    //%block="Set motor %MotorPostion to zero"
    export function resetServoPosition(motorPosition: MotorPosition): void {
        const buffer = pins.createBuffer(8);
        buffer[0] = 0xFF;
        buffer[1] = 0xF9;
        buffer[2] = motorPosition;
        buffer[3] = 0x00;
        buffer[4] = 0x1D;
        buffer[5] = 0x00;
        buffer[6] = 0xF5;
        buffer[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, buffer);
    }

    let motorLeftGlobal = 0
    let motorRightGlobal = 0
    //% group="Application functions"
    //% weight=410
    //%block="Set the running motor to left wheel %MotorPostionLeft right wheel %MotorPostionRight"
    export function setRunningMotorSpeed(motorLeftPosition: MotorPositionLeft, motorRightPosition: MotorPositionRight): void {
        motorLeftGlobal = motorLeftPosition;
        motorRightGlobal = motorRightPosition;
    }

    //% group="Application functions"
    //% weight=409
    //%block="Set the speed to %speed \\%"
    //% speed.min=0  speed.max=100
    export function setMotionSpeed(speedValue: number): void {
        motorspeedGlobal = speedValue;
    }


    //% group="Application functions"
    //% weight=406
    //%block="Stop movement"
    export function StopCombinationMotor(): void {
        nezha2MotorStop(motorLeftGlobal)
        nezha2MotorStop(motorRightGlobal)
    }

    //% group="Application functions"
    //% weight=405
    //%block="Combination Motor Move to %VerticallDirection"
    //%block="Move %VerticallDirection"

    
    export function combinationMotorVerticalDirectionMove(direction: VerticalDirection): void {
        switch (direction) {
            case VerticalDirection.up:
                setMotorSpeed(motorLeftGlobal, MovementDirection.ccw, motorspeedGlobal);
                setMotorSpeed(motorRightGlobal, MovementDirection.cw, motorspeedGlobal);
                break;
            case VerticalDirection.down:
                setMotorSpeed(motorLeftGlobal, MovementDirection.cw, motorspeedGlobal);
                setMotorSpeed(motorRightGlobal, MovementDirection.ccw, motorspeedGlobal);
                break;
        }
    }

    //% group="Application functions"
    //% weight=402
    //%block="Set the left wheel of %speedleft and the right wheel of %speedright "
    //%block="Set the left wheel speed at %speedleft \\%, right wheel speed at %speedright \\%"
    //% speedleft.min=-100  speedleft.max=100 speedright.min=-100  speedright.max=100
    export function setSpeedForLeftRightWheel(leftSpeed: number, rightSpeed: number): void {
        if (leftSpeed > 0) {
            controlMotorSpeed(motorLeftGlobal, MovementDirection.ccw, leftSpeed);
        } else {
            controlMotorSpeed(motorLeftGlobal, MovementDirection.cw, Math.abs(leftSpeed));
        }
        if (rightSpeed > 0) {
            controlMotorSpeed(motorRightGlobal, MovementDirection.cw, rightSpeed);
        } else {
            controlMotorSpeed(motorRightGlobal, MovementDirection.ccw, Math.abs(rightSpeed));
        }
    }

    //% group="export functions"
    //% weight=320
    //%block="Version Number"
    export function readFirmwareVersion(): string {
        const commandBuffer = pins.createBuffer(8);
        commandBuffer[0] = 0xFF;
        commandBuffer[1] = 0xF9;
        commandBuffer[2] = 0x00;
        commandBuffer[3] = 0x00;
        commandBuffer[4] = 0x88;
        commandBuffer[5] = 0x00;
        commandBuffer[6] = 0x00;
        commandBuffer[7] = 0x00;
        pins.i2cWriteBuffer(i2cAddr, commandBuffer);
        const versionBuffer = pins.i2cReadBuffer(i2cAddr, 3);
        return `V ${versionBuffer[0]}.${versionBuffer[1]}.${versionBuffer[2]}`;
    }
}