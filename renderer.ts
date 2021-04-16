import { ipcRenderer } from 'electron';
import { QuestionType } from './objTypes';

const questionContainer: Element | null = document.getElementById("question-container");

const loadQuestion = async ():Promise<QuestionType[]> => {
  let data = [];
  try {
    const result = await window.fetch(`${process.env.BASE_URL}/getquestion`);
    data = await result.json();
    return data.data;
  } catch (error) {
    throw new Error("Error, cannot fetch question from server");
  }
};

const closeChildWindow = ():void => {
  ipcRenderer.send("no-action");
};
let timerId = setTimeout(closeChildWindow, 5000);

loadQuestion().then((result: QuestionType[]):void => {
  if (questionContainer !== null) {
    result.map((val: QuestionType):void => {
      const btn:HTMLElement = document.createElement("button");
      btn.id = val.id;
      btn.innerText = val.question;
      btn.setAttribute("answerid", val.answerId);
      questionContainer.appendChild(btn);
    });
  }
}).catch((error: Error) => console.log('error fetch question =>', error));

if (questionContainer != null) {
  questionContainer.addEventListener("click", (e: any):void => {
    if (e.target && e.target.nodeName === "BUTTON") {
      clearTimeout(timerId);
      ipcRenderer.send("open-answer", e.target.getAttribute('answerid'));
      timerId = setTimeout(closeChildWindow, 5000);
    }
  });
};
