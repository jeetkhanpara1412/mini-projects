import wikipedia
import openai
from config import apikey
import os
import webbrowser
import pyttsx3
import speech_recognition as sr #speechrecognition
import datetime
import smtplib
import random

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
print(voices[0].id)
engine.setProperty('voice', voices[0].id)

chatstr = ""
def chat(query):
    global chatstr
    print(chatstr)
    openai.api_key = apikey
    chatstr += f"jeet: {query}\n jarvis:"

    try:
        response = openai.completions.create(
            model="text-davinci-003",
            prompt=chatstr,
            temperature=0.7,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response_text = response.choices[0].text.strip()
        speak(response_text)
        chatstr += f"{response_text}\n"
        # with open(f" openai/prompt - {random.randint(1, 4486548648)}", "w") as f:
        if not os.path.exists("openai"):
            os.makedirs("openai")
        with open(f"openai/chat_log{''.join(chatstr.split('intelligence')[1:]).strip()}.txt", "w") as f:
            f.write(chatstr)
        return response_text
    except Exception as e:
        print(f"Error during chat with OpenAI: {e}")
        speak("Sorry sir, I encountered an issue while chatting.")
        return None

def ai(prompt):
    openai.api_key = apikey
    text = f"open ai response for prompt :{prompt} \n *************\n\n "

    try:
        response = openai.completions.create(
            model="text-davinci-003",
            prompt=prompt,
            temperature=0.7,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        response_text = response.choices[0].text.strip()
        print(response_text)
        text += response_text

        if not os.path.exists("openai"):
            os.makedirs("openai")

        # with open(f" openai/prompt - {random.randint(1, 4486548648)}", "w") as f:
        with open(f"openai/prompt_{''.join(prompt.split('intelligence')[1:]).strip()}.txt", "w") as f:
            f.write(text)
        return response_text
    except Exception as e:
        print(f"Error during AI processing: {e}")
        speak("Sorry sir, I encountered an issue while processing your request.")
        return None

def speak(audio):
    engine.say(audio)
    engine.runAndWait()

def wishme():
    hour = int(datetime.datetime.now().hour)
    if hour>=0 and hour<12:
        speak("Good morning.")
    elif hour>=12 and hour<18:
        speak("Good afternoon.")
    else:
        speak("Good evening.")
    speak("I am Jarvis. Sir, please tell me how may I help you.")

def tackcommand():
    # it takes microphone input from the user and returns string output
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        try:
            audio = r.listen(source)
        except sr.WaitTimeoutError:
            print("No speech detected within the timeout.")
            return "None"

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language='en-in')
        print(f"User said: {query}\n")
        return query
    except sr.UnknownValueError:
        print("Could not understand audio.")
        speak("Sorry sir, I didn't catch that. Could you please say it again?")
        return "None"
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
        speak("Sorry sir, there was an issue with the speech recognition service.")
        return "None"
    return "None" # Return "None" if no speech is detected initially

def sendemail(to, content):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    try:
        server.login('yourjeet@gmail.com', 'your-password')
        server.sendmail('yourjeet@gmail.com', to, content)
        server.close()
        speak("Email has been sent.")
    except Exception as e:
        print(f"Error sending email: {e}")
        speak("Sorry sir, I am not able to send this email at the moment.")

if __name__ == "__main__":
    wishme()
    while True:
        query = tackcommand().lower()

        if 'wikipedia' in query:
            speak('Searching Wikipedia...')
            query = query.replace("wikipedia", "").strip()
            try:
                results = wikipedia.summary(query, sentences=1)
                speak("According to Wikipedia")
                print(results)
                speak(results)
            except wikipedia.exceptions.PageError:
                speak(f"Sorry sir, I could not find any information on {query}.")
            except wikipedia.exceptions.DisambiguationError as e:
                speak(f"There are multiple results for {query}. Could you please be more specific?")
                print(e)
            except Exception as e:
                print(f"Error while searching Wikipedia: {e}")
                speak("Sorry sir, there was an issue while searching Wikipedia.")

        elif 'open youtube' in query:
            webbrowser.open("https://www.youtube.com")

        elif 'open google' in query:
            webbrowser.open("https://www.google.com")

        elif 'open instagram' in query:
            webbrowser.open("https://www.instagram.com")

        elif 'open stackoverflow' in query:
            webbrowser.open("https://stackoverflow.com")

        elif 'play music' in query:
            music_dir = 'D:\\Garaba\\TITODO'
            songs = os.listdir(music_dir)
            print(songs)
            if songs:
                random_song = random.choice(songs)
                os.startfile(os.path.join(music_dir, random_song))
            else:
                speak("Sorry sir, the music directory is empty.")

        elif 'the time' in query:
            strtime = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"Sir, the time is {strtime}")

        elif 'open code' in query:
            codepath = "C:\\Users\\JK\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
            os.startfile(codepath)

        elif 'using artificial intelligence' in query:
            ai(prompt=query)

        elif 'jarvis' in query:
            query = query.replace("jarvis", "").strip()
            if query:
                chat(query)
            else:
                speak("Sir, how can I assist you?")

        elif 'email to jeet' in query:
            try:
                speak("What should I say?")
                content = tackcommand()
                if content and content.lower() != "none":
                    to = "jeetyouremail@gmail.com"
                    sendemail(to, content)
                else:
                    speak("Email content not provided.")
            except Exception as e:
                print(f"Error during email process: {e}")
                speak("Sorry sir, I am not able to send this email at the moment.")

        elif 'exit' in query:
            speak("Thank you sir, have a good day.")
            break