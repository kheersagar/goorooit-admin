import React, { useState, useEffect, Fragment } from 'react';
import { getProfDetails, editProfessionalSkills } from '../../redux/api';
import '../../styles/SkillEditPage.css';

const SkillEditPage = (props) => {
  const [openEdit, setOpenEdit] = useState(-1);
  const [profSkills, setProfSkills] = useState([]);
  const [editedSkill, setEditedSkill] = useState({
    name: '',
    price: '',
  });
  const [newSkill, setNewSkill] = useState({
    name: '',
    price: '',
  });
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;

  const fetchProf = async (id) => {
    setLoading(true);
    try {
      const { data } = await getProfDetails(id);
      // console.log(data?.user?.skills);
      setLoading(false);
      setProfSkills(data?.user?.skills ? data?.user?.skills : []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProf(id);
  }, [id]);

  const handleEditSkill = (e) => {
    const { name, value } = e.target;
    setEditedSkill({ ...editedSkill, [name]: value });
  };

  const handleAddNewSkill = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleEditSubmit = async () => {
    try {
      const { data } = await editProfessionalSkills({
        id: id,
        skill: editedSkill.name,
        newPrice: editedSkill.price,
      });
      setEditedSkill({ name: '', price: '' });
      setOpenEdit(-1);
      fetchProf(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='skill-container'>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className='skill-skillContainer'>
            <div className='skill-header'>
              <h3> Professional Skills</h3>
            </div>
            <Fragment>
              {addNew ? (
                <div className='skill-infoDiv editInputDiv'>
                  <input
                    value={newSkill.name}
                    name='name'
                    placeholder='Skill'
                    className='edit-skillName'
                    onChange={handleAddNewSkill}
                  />
                  <input
                    type='number'
                    min='1'
                    value={newSkill.price}
                    name='price'
                    onChange={handleAddNewSkill}
                    placeholder='price (Ex. 100)'
                    className='edit-skillPrice'
                  />
                  <span className='skill-actionBtn'>Add</span>
                  <span
                    className='skill-actionBtn'
                    onClick={() => {
                      setAddNew(false);
                      setNewSkill({ name: '', price: '' });
                    }}
                  >
                    Cancel
                  </span>
                </div>
              ) : (
                <Fragment>
                  {profSkills?.map((skill, i) => (
                    <div className='skill-contentDiv' key={i}>
                      {openEdit !== i ? (
                        <div className='skill-infoDiv'>
                          <p className='skill-skillName'>{skill.name}</p>
                          <div className='skill-skillPriceDiv'>
                            <p className='skill-skillPrice'>
                              Rs. {skill.price}/-
                            </p>
                            <span
                              onClick={() => {
                                setOpenEdit(i);
                                setEditedSkill({
                                  name: skill.name,
                                  price: skill.price,
                                });
                              }}
                              className='skill-actionBtn'
                            >
                              Edit
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className='skill-infoDiv editInputDiv'>
                          <p className='skill-skillName'>{skill.name}</p>
                          <input
                            name='price'
                            onChange={handleEditSkill}
                            value={editedSkill.price}
                            className='edit-skillPrice'
                          />
                          <span
                            className='skill-actionBtn'
                            onClick={handleEditSubmit}
                          >
                            Submit
                          </span>
                          <span
                            className='skill-actionBtn'
                            onClick={() => {
                              setEditedSkill({ name: '', price: '' });
                              setOpenEdit(-1);
                            }}
                          >
                            Cancel
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </Fragment>
              )}
            </Fragment>
            {/* {!openEdit ? (
          <Fragment>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, i) => (
              <div className='skill-contentDiv' key={i}>
                <div className='skill-infoDiv'>
                  <p className='skill-skillName'>Skill1</p>
                  <div className='skill-skillPriceDiv'>
                    <p className='skill-skillPrice'>Rs. 500/-</p>
                    <span onClick={() => setOpenEdit(!openEdit)}>Edit</span>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row, i) => (
              <div className='skill-contentDiv' key={i}>
                <div className='skill-infoDiv'>
                  <input value='Skill1' className='edit-skillName' />
                  <input value='Rs 500/-' className='edit-skillPrice' />
                </div>
              </div>
            ))}
          </Fragment>
        )} */}
          </div>
          {/* {!addNew && (
        <div className='skill-addBtnDiv'>
          <button className='skill-addBtn' onClick={() => setAddNew(true)}>
            Add Skill
          </button>
        </div>
      )} */}
        </Fragment>
      )}
    </div>
  );
};

export default SkillEditPage;
