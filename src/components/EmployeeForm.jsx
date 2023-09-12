import { useNavigate, useParams } from 'react-router-dom';
import { addEmployee, getEmployeeById } from '../service/localstorage';
import { useForm } from './../hooks/useForm';
import { useState, useEffect } from 'react';
import { editEmployee } from './../service/localstorage';
import uuid from 'react-uuid' ;
import isEmpty from "validator/lib/isEmpty"

export const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAlert, setshowAlert] = useState(false);
    const [inputError, setInputError] = useState({}) ;
    const { inputValues, handleInputChange, resetForm, setForm, validateAll } = useForm({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        if (id) {
            const employee = getEmployeeById(id);
            setForm(employee);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        id ? editEmployee(id, inputValues) : addEmployee({ id: uuid(), ...inputValues });
        resetForm();
        setshowAlert(true);
        setTimeout(() => {
            setshowAlert(false);
        }, 2000);
        if(!inputValues.name){ 
            alert('Please input your name') ;
            return ;
        };

        if(!inputValues.email){ 
            alert('Please input your mail') ;
            return ;
        };

        if(!inputValues.address){ 
            alert('Please input your address') ;
            return ;
        };

        if(!inputValues.phone){ 
            alert('Please input your phone number') ;
            return ;
        };
    };




    return (
        <div>

            <div className="d-flex my-5 justify-content-between">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/")}>Back</button>
                <h1 className="text-center">{id ? "Edit" : "Add new"} Student</h1>
                <div />
            </div>

            <div className="card border-primary p-5 m-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={inputValues.name}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={inputValues.email}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>

            


                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={inputValues.address}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>


                    <div className="form-group">
                        <label className="form-label mt-2" htmlFor="inputValid">Phone</label>
                        <input
                            name="phone"
                            type="number"
                            value={inputValues.phone}
                            onChange={handleInputChange}
                            className="form-control"
                            id="inputValid"
                        />
                    </div>


                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-outline-primary btn-block">{id ? "Edit" : "Add"} Student</button>
                    </div>
                </form>
            </div>

            {
                showAlert && (
                    <div className="px-5">
                        <div className="alert alert-success">
                            <strong>Well done!</strong> {id ? "edited" : "added a new"} Student.
                        </div>
                    </div>
                )
            }

        </div >
    )
}
