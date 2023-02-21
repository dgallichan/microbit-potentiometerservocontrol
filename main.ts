let thisValue = 0
basic.showLeds(`
    # # . # #
    # # . # #
    . . . . .
    # . . . #
    . # # # .
    `)
let outputVariable = 512
basic.forever(function () {
    outputVariable = pins.analogReadPin(AnalogPin.P1)
    thisValue = Math.map(outputVariable, 0, 1023, 0, 180)
    thisValue = Math.constrain(thisValue, 0, 180)
    Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Top, "Raw:" + convertToText(outputVariable))
    Kitronik_VIEWTEXT32.displaySingleLineString(Kitronik_VIEWTEXT32.DisplayLine.Bottom, "To servo:" + convertToText(thisValue).substr(0, 6))
    pins.servoWritePin(AnalogPin.P8, thisValue)
})
