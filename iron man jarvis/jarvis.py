import pyttsx3
import speech_recognition as sr #speechrecognition
import wikipedia
import datetime
import os
import smtplib
import webbrowser

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
print(voices[1].id)
engine.setProperty('voice', voices[1].id)

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def wishme():
    
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("good morning.")

    elif hour>=12 and hour<18:
        speak("good afternoon.")

    else:
        speak("good evenging.")

    speak("I am lizaa. sir please tell me how may I help you")

def tackcommand():
    # it takes microphone input from the user and returns string output

    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("listening...")
        r.pause_threshold = 1
        # r.adjust_for_ambient_noise(source)
        audio = r.listen(source)

    try:
        print("Recognizig...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")

    except Exception as e:
        # print(e)
        print("Say that again plase...")
        return "None"
    return query

def sendemail(to, content):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.login('yourjeet@gmail.com', 'your-password')
    server.sendmail('yourjeet@gmail.com', to, content)
    server.close()
    
if __name__ == "__main__":
    wishme()
    # if 1:
    while True:
        query = tackcommand().lower()

        # logic for executing tasks based on query
        if 'wikipedia' in query:
            speak('seraching wikipedia...')
            query = query.replace("wikipedia", "")
            results = wikipedia.summary(query, sentences=1)
            speak("According to wikipedia")
            print(results)
            speak(results)
        
        elif 'open youtube' in query:
            webbrowser.open("youtube.com")
        
        elif 'open google' in query:
            webbrowser.open("google.com")
        
        elif 'open instagram' in query:
            webbrowser.open("Instagram.com")
        
        elif 'open stackoverflow' in query:
            webbrowser.open("stackoverflow.com")

        elif 'play music' in query:
            music_dir = 'D:\\Garaba\\TITODO'
            songs = os.listdir(music_dir)
            print(songs)
            os.startfile(os.path.join(music_dir, songs[0]))

        elif 'the time' in query:
            strtime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"sir, the time is {strtime}")

        elif 'open code' in query:
            codepath = "C:\\Users\\JK\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
            os.startfile(codepath)

        elif 'email to jeet' in query:
            try:
                speak("what should I say")
                content = tackcommand()
                to = "jeetyouremail@gmail.com"
                sendemail(to, content)
                speak("email has been sent")

            except Exception as e:
                print(e)
                speak("sorry my friend jeet bhai. I am not able to send this email")

        elif 'exit' in query:
            exit()
