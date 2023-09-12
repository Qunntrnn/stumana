import { EmployeeItem } from './EmployeeItem';
import { useEffect, useState } from 'react';
import { getListEmployees } from './../service/localstorage';

export const EmployeeList = () => {
    const [query, setQuery] = useState("") ;
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        setEmployees(getListEmployees());
    }, []);


    return (
        <div>
            <input className="form-label mt-2" type='text' placeholder='Search' className='search' onChange={e => setQuery(e.target.value)}></input>
            <h1 className="my-5 text-center">LIST STUDENT</h1>

            {
                employees.length > 0 ? (
                    <div className="card bg-secondary p-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.filter(employee => employee.name.toLowerCase().includes(query)).map(employee => <EmployeeItem employee={employee} key={employee.id} setEmployees={setEmployees} />)
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <h3 className="text-center">Empty</h3>
                )
            }

        </div>
    )
}
