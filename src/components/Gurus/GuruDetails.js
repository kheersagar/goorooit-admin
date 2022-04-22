import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ProfessionalOrdersTable from "./ProfessionalOrdersTable";
import { getGuruDetails, getProfOrders } from "../../redux/api";
import "../../styles/AspirantDetails.css";

const GuruDetails = (props) => {
  const history = useHistory();
  const [profData, setProfData] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [boolVal, setBoolVal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = props.match.params.id;

  const fetchProf = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getGuruDetails(id);
      console.log(data.guru);
      setProfData(data.guru);
      setExperiences(data?.guru?.Experience);
      setEducation(data?.guru?.Education);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fetchProfOrders = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await getProfOrders(id);
      // console.log(data);
      setAllOrders(data.orders);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!boolVal) {
      fetchProf(id);
      // fetchProfOrders(id);
      setBoolVal(true);
    }
  }, [boolVal, id]);

  const renderSkills = (skills) => {
    var skillsArray = [];
    skills.forEach((skill) => {
      skillsArray.push(skill.name);
    });
    return skillsArray.join(", ");
  };

  const renderLang = (langs) => {
    var langArray = [];
    langs.forEach((lang) => {
      langArray.push(lang.name);
    });
    return langArray.join(", ");
  };

  return (
    <div className="aspirantDetails-container">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Fragment>
          <div className="aspirantDetails-personalInfoDiv">
            <div className="aspirantDetails-leftDiv">
              <div className="aspirantDetails-imageDiv">
                <img
                  src={profData.photo}
                  alt="profilePic"
                  className="aspirantDetails-image"
                />
              </div>
              <div className="aspirantDetails-infoDiv">
                <p className="aspirantDetails-infoPara">
                  {profData.name ? profData.name : ""},{" "}
                  <span className="aspirantDetails-infoSpan">
                    {profData.username ? profData.username : ""}
                  </span>
                </p>
                <p className="aspirantDetails-infoPara">
                  {profData.number ? profData.number : ""}
                </p>
                <p className="aspirantDetails-infoPara">
                  {profData.email ? profData.email : ""}
                </p>
              </div>
            </div>
            <div className="aspirantDetails-rightDiv">
              <div className="aspirantDetails-infoDiv">
                {/* <p className='aspirantDetails-infoPara'>
                  {profData.HKTID ? 'HKTID : ' : ''}
                  <span className='aspirantDetails-infoSpan'>
                    {profData.HKTID ? profData.HKTID : ''}
                  </span>
                </p> */}
                <p className="aspirantDetails-infoPara">
                  {profData?.languages?.length > 0 ? "Language : " : ""}
                  <span className="aspirantDetails-infoSpan">
                    {profData?.languages?.length > 0
                      ? renderLang(profData.languages)
                      : ""}
                  </span>
                </p>
                <p className="aspirantDetails-infoPara">
                  {profData?.tagline ? "Tagline : " : ""}
                  <span className="aspirantDetails-infoSpan">
                    {profData?.tagline ? profData?.tagline : ""}
                  </span>
                </p>
                <p className="aspirantDetails-infoPara">
                  {profData?.level ? "Level : " : ""}
                  <span className="aspirantDetails-infoSpan">
                    {profData?.level ? profData?.level : ""}
                  </span>
                </p>
                {/* <p className='aspirantDetails-infoPara'>
                  {'Sessions Given : '}
                  <span className='aspirantDetails-infoSpan'>
                    {profData?.successful_session
                      ? profData?.successful_session
                      : '0'}
                  </span>
                </p> */}
              </div>
            </div>
          </div>
          <div className="aspirantDetails-incomeSection">
            <div className="aspirantDetails-incomeCardDiv skillsCard">
              <p className="aspirantDetails-incomeCardLabel ">Skills</p>
              <div className="aspirantDetails-incomeCard">
                <div className="artistDetails-incomeHeader">
                  <h3 className="aspirantDetails-incomeCardTitle skills">
                    Skills
                  </h3>
                  <span
                    className="skill-editBtn"
                    onClick={() =>
                      history.push(`/professionals/detail/${id}/edit-skill`)
                    }
                  >
                    Edit
                  </span>
                </div>
                <p className="aspirantDetails-income allSkills">
                  {profData?.skills?.length > 0
                    ? renderSkills(profData.skills)
                    : ""}
                </p>
              </div>
            </div>
            <div className="aspirantDetails-incomeCardDiv bankCard">
              <p className="aspirantDetails-incomeCardLabel ">Bank Details</p>
              <div className="aspirantDetails-incomeCard">
                <div className="artistDetails-incomeHeader">
                  <h3 className="aspirantDetails-incomeCardTitle skills">
                    Bank Details
                  </h3>
                  {/* <span
                    className='skill-editBtn'
                    onClick={() =>
                      history.push(`/professionals/detail/${id}/edit-skill`)
                    }
                  >
                    Edit
                  </span> */}
                </div>
                <p className="aspirantDetails-income allSkills">
                  Bank name:{" "}
                  {profData?.bankDetails?.name
                    ? profData?.bankDetails?.name
                    : ""}
                </p>
                <p className="aspirantDetails-income allSkills">
                  Account no:{" "}
                  {profData?.bankDetails?.accNumber
                    ? profData?.bankDetails?.accNumber
                    : ""}
                </p>
                <p className="aspirantDetails-income allSkills">
                  IFSC code:{" "}
                  {profData?.bankDetails?.ifcs
                    ? profData?.bankDetails?.ifcs
                    : ""}
                </p>
              </div>
            </div>
            {/* aadhar front */}
            <div className="aspirantDetails-incomeCardDiv ">
              <p className="aspirantDetails-incomeCardLabel ">Aadhar Card</p>
              <div className="image-div-cont">
                <div className="image-div">
                  <img src={profData?.adhaarCard?.front} className="card_img" />
                </div>
                <div className="image-div">
                  <img src={profData?.adhaarCard?.back} className="card_img" />
                </div>
              </div>
            </div>
            {/* pan card */}
            <div className="aspirantDetails-incomeCardDiv ">
              <p className="aspirantDetails-incomeCardLabel ">Pan Card</p>
              <div className="image-div-cont">
                <div className="image-div">
                  <img src={profData?.panCard?.url} className="card_img" />
                </div>
              </div>
            </div>
          </div>
          <div className="aspirantDetails-experienceSection">
            <div className="aspirantDetails-incomeCardDiv companyCard">
              <p className="aspirantDetails-incomeCardLabel">Education</p>
              <div className="aspirantDetails-incomeCard aspirantDetails-company">
                {education.length > 0 ? (
                  <Fragment>
                    {education?.map((c, i) => (
                      <div className="aspirantDetails-companyDetails" key={i}>
                        <h3 className="aspirantDetails-companyTitle">
                          {c.InstituteName}
                        </h3>
                        <p className="aspirantDetails-date">
                          {c.CourseName ? c.CourseName : ""}
                        </p>
                        <p className="aspirantDetails-date">{`${
                          c.startDate ? c.startDate : "NA"
                        }-${c.endDate ? c.endDate : "NA"}`}</p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    No Experience
                  </h4>
                )}
              </div>
            </div>
            <div className="aspirantDetails-incomeCardDiv companyCard">
              <p className="aspirantDetails-incomeCardLabel">Experience</p>
              <div className="aspirantDetails-incomeCard aspirantDetails-company">
                {experiences.length > 0 ? (
                  <Fragment>
                    {experiences?.map((c, i) => (
                      <div className="aspirantDetails-companyDetails" key={i}>
                        <h3 className="aspirantDetails-companyTitle">
                          {c.companyName}
                        </h3>
                        <p className="aspirantDetails-date">
                          {c.role ? c.role : ""}
                        </p>
                        <p className="aspirantDetails-date">{`${
                          c.startDate
                            ? moment(c.startDate).format("DD/MM/YYYY")
                            : "NA"
                        }-${
                          c.endDate !== "Present"
                            ? moment(c.endDate).format("DD/MM/YYYY")
                            : c.endDate
                        }`}</p>
                      </div>
                    ))}
                  </Fragment>
                ) : (
                  <h4
                    style={{
                      fontSize: "16px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    No Experience
                  </h4>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default GuruDetails;
