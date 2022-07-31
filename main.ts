let geluid_nivo: number;
let geluid_nivo_laatst: number;
let morseGehoord: string;
let debugUit: string;
let ledX: number;
let telDuurPiep = 0
let drempelVolume = 50
let drempelEenheid = 10
let drempelKort = 1 * drempelEenheid
let drempelLang = 3 * drempelEenheid
let ledA = 0
let ledB = 0
let ledC = 0
serial.writeLine("started...started...started...started...started...")
while (1) {
    geluid_nivo = input.soundLevel()
    if (geluid_nivo > drempelVolume) {
        telDuurPiep = telDuurPiep + 1
        geluid_nivo_laatst = geluid_nivo
    }
    
    //     if geluid_nivo > 50:
    //         serial.write_numbers([geluid_nivo, telDuurPiep])
    if (geluid_nivo == 0) {
        if (telDuurPiep > 0 && telDuurPiep < drempelKort) {
            morseGehoord = "te kort"
        }
        
        if (telDuurPiep >= drempelKort && telDuurPiep < drempelLang) {
            morseGehoord = "kort"
        }
        
        if (telDuurPiep >= drempelLang) {
            morseGehoord = "lang"
        }
        
        if (telDuurPiep > 0) {
            debugUit = morseGehoord + " - " + telDuurPiep + " - " + geluid_nivo_laatst
            telDuurPiep = 0
            if (morseGehoord == "te kort") {
                ledX = 0
                if (ledA <= 4) {
                    led.plot(ledX, ledA)
                }
                
                if (ledA > 4 && ledA <= 9) {
                    led.unplot(ledX, ledA - 5)
                }
                
                if (ledA < 9) {
                    ledA = ledA + 1
                } else {
                    ledA = 0
                }
                
            }
            
            if (morseGehoord == "kort") {
                ledX = 2
                if (ledB <= 4) {
                    led.plot(ledX, ledB)
                }
                
                if (ledB > 4 && ledB <= 9) {
                    led.unplot(ledX, ledB - 5)
                }
                
                if (ledB < 9) {
                    ledB = ledB + 1
                } else {
                    ledB = 0
                }
                
            }
            
            if (morseGehoord == "lang") {
                ledX = 4
                if (ledC <= 4) {
                    led.plot(ledX, ledC)
                }
                
                if (ledC > 4 && ledC <= 9) {
                    led.unplot(ledX, ledC - 5)
                }
                
                if (ledC < 9) {
                    ledC = ledC + 1
                } else {
                    ledC = 0
                }
                
            }
            
            serial.writeLine(debugUit)
        }
        
    }
    
    // basic.show_leds(""". . . . . . . # . . . . . . . . . . . . . . . . . """)
    basic.pause(10)
}
