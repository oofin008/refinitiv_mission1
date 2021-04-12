import { ipcRenderer } from 'electron';

const questionContainer: Element | null = document.getElementById("question-container");

const loadQuestion = async ():Promise<questionDataType[]> => {
  let data = [];
  try {
    const result = await window.fetch('http://localhost:3000/getquestion');
    data = await result.json();
    return data.data;
  } catch (error) {
    throw new Error("cannot fetch data from server");
  }
};

loadQuestion().then((result: questionDataType[]):void => {
  if (questionContainer !== null) {
    result.map((val: questionDataType):void => {
      const btn:HTMLElement = document.createElement("button");
      btn.id = val.id;
      btn.innerText = val.question;
      btn.setAttribute("answerid", val.answerId);
      questionContainer.appendChild(btn);
    });
  }
}).catch((error: Error) => console.log('error fetch question =>', error));

if (questionContainer !== null) {
  questionContainer.addEventListener("click", (e: any):void => {
    if (e.target && e.target.nodeName === "BUTTON") {
      ipcRenderer.send("open-answer", e.target.getAttribute('answerid'));
    }
  });
};
interface questionDataType {
  id: string;
  question: string;
  answerId: string;
}
