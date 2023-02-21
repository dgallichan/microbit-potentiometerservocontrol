let thisValue = 0
radio.setGroup(254)
basic.showLeds(`
    . # . # .
    . . . . .
    . . # . .
    # . . . #
    . # # # .
    `)
let outputVariable = 512
basic.forever(function () {
    outputVariable = pins.analogReadPin(AnalogPin.P1)
    serial.writeValue("x", outputVariable)
    thisValue = Math.constrain(Math.map(outputVariable, 0, 1023, 0, 180), 0, 180)
    Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, convertToText(thisValue).substr(0, 6))
    if (input.buttonIsPressed(Button.A)) {
        radio.sendValue("Lmotor", thisValue)
        Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, "Transmitting!")
    } else {
        radio.sendValue("Lmotor", 0)
        Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, "<not sending>")
    }
})
