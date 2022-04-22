import React from "react";
import { useHistory } from "react-router-dom";

function QuestionDetails() {
  const history = useHistory();
  console.log(history);
  const data = history.location.state;
  const date = new Date(data.date).toUTCString();
  return (
    <div className="question_brief_cont">
      <div className="question_cont">
        <div className="question_title"> {data.body} </div>
        <div className="question_date">
          Asked {date} by <span className="asked_name">{data.userId.name}</span>
        </div>
        <div className="skills_container">
          {data.skillSet.map((s, i) => {
            return <div className="skills_name">{s.skill}</div>;
          })}
        </div>
      </div>
      {data.profResponds.length !== 0 ? data.profResponds.map((item, index) => {
        return <div className="anwers_div">
          {item.answers.map((ans,i)=>{
            return <p>{ans}</p>
          })}
        </div>;
      }) :
      
      <div>No Answer</div>
      }
    </div>
  );
}

export default QuestionDetails;
