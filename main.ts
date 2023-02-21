input.onButtonPressed(Button.A, function () {
    isTransmitting = !(isTransmitting)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    radio.sendValue("Turn", 0)
    radio.sendValue("Drive", 0)
    radio.sendValue("Grabber", -999)
    basic.pause(2000)
    basic.showIcon(IconNames.Happy)
})
input.onButtonPressed(Button.B, function () {
    isLeftMotor = !(isLeftMotor)
})
let thisValue = 0
let isLeftMotor = false
let isTransmitting = false
radio.setGroup(254)
basic.showLeds(`
    . # . # .
    . . . . .
    . . # . .
    # . . . #
    . # # # .
    `)
let outputVariable = 512
isTransmitting = false
isLeftMotor = true
basic.forever(function () {
    outputVariable = pins.analogReadPin(AnalogPin.P1)
    serial.writeValue("x", outputVariable)
    thisValue = Math.constrain(Math.map(outputVariable, 0, 1023, 0, 180), 0, 180)
    Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, convertToText(thisValue).substr(0, 6))
    if (isTransmitting) {
        if (isLeftMotor) {
            radio.sendValue("Lmotor", thisValue)
        } else {
            radio.sendValue("Rmotor", thisValue)
        }
        Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, "Transmitting!")
    } else {
        Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, "<not sending>")
    }
})
