import "./style.css";
import React, { useState, useEffect } from "react";

// State variables to manage form fields and related data
const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [previousJob, setPreviousJob] = useState("");
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [citiesByNationality, setCitiesByNationality] = useState([]);
  const [formData, setFormData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  // Function to handle changes in the selected nationality

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);

    // Updates the available cities based on selected nationality
    if (e.target.value === "الأردن") {
      setCitiesByNationality(["اربد", "عمان", "الزرقا"]);
    } else if (e.target.value === "السعودية") {
      setCitiesByNationality(["الرياض", "مكة", "المدينة"]);
    } else {
      setCitiesByNationality([]);
    }
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collects form data into a new object
    const newData = {
      firstName,
      secondName,
      thirdName,
      age,
      degree,
      previousJob,
      nationality,
      city,
    };

    // Checks if in edit mode, updates data or appends new data accordingly

    if (editIndex !== -1) {
      const updatedFormData = [...formData];
      updatedFormData[editIndex] = newData;
      setFormData(updatedFormData);
      setEditIndex(-1); // Exits edit mode
    } else {
      setFormData([...formData, newData]);
    }
    // Clears form fields
    clearFormFields();
  };
  // Function to load existing entry data into form fields for editing
  const handleEdit = (index) => {
    const selectedEntry = formData[index];
    setFirstName(selectedEntry.firstName);
    setSecondName(selectedEntry.secondName);
    setThirdName(selectedEntry.thirdName);
    setAge(selectedEntry.age);
    setDegree(selectedEntry.degree);
    setPreviousJob(selectedEntry.previousJob);
    setNationality(selectedEntry.nationality);
    setCity(selectedEntry.city);
    setEditIndex(index); // Sets the index for editing
  };

  // to clear form fields when editIndex changes
  useEffect(() => {
    if (editIndex !== -1) {
      clearFormFields();
    }
  }, [editIndex]);

  // Function to delete an entry from form data
  const handleDelete = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };
  // Function to reset all form fields to empty strings
  const clearFormFields = () => {
    setFirstName("");
    setSecondName("");
    setThirdName("");
    setAge("");
    setDegree("");
    setPreviousJob("");
    setNationality("");
    setCity("");
  };

  return (
    <>
      <div className="form-container">
        <h1>تسجيل دخول</h1>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="input-group">
            <label>
              <span>*</span>الأسم الأول
              <input
                placeholder="أدخل إسمك الأول"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span>الأسم الثاني
              <input
                placeholder="أدخل إسمك الثاني"
                type="text"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span> العائلة
              <input
                placeholder="أدخل إسم العائلة"
                type="text"
                value={thirdName}
                onChange={(e) => setThirdName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span>العُمر
              <input
                placeholder="أدخل العُمر"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span>الدّرجة العلمية
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
                <option selected disabled value="">
                  إختار الدرجة العلمية
                </option>
                <option value="الثانوية">الثانوية</option>
                <option value="البكالوريوس">البكالوريوس</option>
                <option value="الماجستير">الماجستير</option>
                <option value="الدكتوراة">الدكتوراة</option>
              </select>
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span>الوظيفة السابقة
              <textarea
                placeholder="أدخل إسم وظيفتك السابقة"
                value={previousJob}
                onChange={(e) => setPreviousJob(e.target.value)}
                rows="4"
                cols="50"
              ></textarea>
            </label>
          </div>

          <div className="input-group">
            <label>
              <span>*</span> البلد
              <select
                value={nationality}
                onChange={handleNationalityChange}
                required
              >
                <option selected disabled value="">
                  اختار البلد
                </option>
                <option value="الأردن">الأردن</option>
                <option value="السعودية">السعودية</option>
              </select>
            </label>

            <label>
              <span>*</span>المدينة
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">اختار المدينة</option>
                {citiesByNationality.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="input-group">
            <button type="submit">ادخال</button>
          </div>
        </form>
      </div>
      <table className="submitted-data">
        <thead>
          <tr>
            <th>الاسم الاول</th>
            <th>الاسم الثاني</th>
            <th>العائلة</th>
            <th>العمر</th>
            <th>الدرجة العلمية</th>
            <th>الوظيفة السابقة</th>
            <th>البلد</th>
            <th>المدينة</th>
            <th>الاجرآءات</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.secondName}</td>
              <td>{data.thirdName}</td>
              <td>{data.age}</td>
              <td>{data.degree}</td>
              <td>{data.previousJob}</td>
              <td>{data.nationality}</td>
              <td>{data.city}</td>
              <td className="action-buttons">
                <button onClick={() => handleEdit(index)}>تعديل</button>

                <button onClick={() => handleDelete(index)} className="delete">
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RegistrationForm;
