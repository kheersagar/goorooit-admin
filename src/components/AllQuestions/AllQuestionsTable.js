import React from 'react'
import { useHistory } from 'react-router-dom';

function AllQuestionsTable(props) {
  const {questions} = props;
  const history = useHistory();

  return (
    <div className='table-wrapper' id='#scrollBar'>
    <table className='fl-table'>
      <thead>
        <tr>
          <th >S.No.</th>
          <th>Questions</th>
        </tr>
      </thead>
      <tbody>
      {
        questions.map((item,index)=>{
          const date = new Date(item.date).toUTCString();
          return(
            <tr>
              <td>{index+1}</td>
              <td>
                  <div>
                    <div className='question_body' onClick={()=>{
                      history.push({
                        pathname:`/admin/${item._id}`,
                        state: item
                      });
                    }}>{item.body}</div>
                    <div>
                      <div className='question_details'>Asked {date} by <span className='asked_name'>{item.userId.name}</span></div>
                      <div className='skills_container'>{item.skillSet.map((s,i)=>{
                        return <div className='skills_name'>{s.skill}</div>
                      })}</div>
                    </div>
                  </div>
              </td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  </div>
  )
}

export default AllQuestionsTable