telDuurPiep = 0
drempelVolume = 50
drempelEenheid = 10
drempelKort = 1 * drempelEenheid
drempelLang = 3 * drempelEenheid
ledA = 0
ledB = 0
ledC = 0


serial.write_line("started...started...started...started...started...")
while 1:
    geluid_nivo=input.sound_level()
    if geluid_nivo > drempelVolume:
        telDuurPiep = telDuurPiep + 1
        geluid_nivo_laatst = geluid_nivo
#    if geluid_nivo > 50:
#        serial.write_numbers([geluid_nivo, telDuurPiep])
    if geluid_nivo == 0:
        if telDuurPiep > 0 and telDuurPiep < drempelKort:
            morseGehoord = "te kort"
        if telDuurPiep >= drempelKort and telDuurPiep < drempelLang:
            morseGehoord = "kort"
        if telDuurPiep >= drempelLang:
            morseGehoord = "lang"
        if telDuurPiep > 0:
            debugUit = morseGehoord + " - " + telDuurPiep + " - " + geluid_nivo_laatst
            telDuurPiep = 0
            if morseGehoord == "te kort":
                ledX = 0
                if ledA <= 4: led.plot(ledX,ledA)
                if ledA > 4 and ledA <= 9: led.unplot(ledX,ledA-5)
                if ledA < 9: ledA = ledA + 1
                else: ledA = 0              
            if morseGehoord == "kort":
                ledX = 2
                if ledB <= 4: led.plot(ledX,ledB)
                if ledB > 4 and ledB <= 9: led.unplot(ledX,ledB-5)
                if ledB < 9: ledB = ledB + 1
                else: ledB = 0
            if morseGehoord == "lang":
                ledX = 4
                if ledC <= 4: led.plot(ledX,ledC)
                if ledC > 4 and ledC <= 9: led.unplot(ledX,ledC-5)
                if ledC < 9: ledC = ledC + 1
                else: ledC = 0
            serial.write_line(debugUit)
            #basic.show_leds(""". . . . . . . # . . . . . . . . . . . . . . . . . """)

    basic.pause(10)
