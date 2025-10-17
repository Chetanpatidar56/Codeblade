
import { useEffect, useState } from "react";
import axiosClient from "../client/axiosClient";

const AdminDelete=()=>{
    const [problems,setProblems]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);

    useEffect(()=>{
        fetchProblems();
    },[]);

    const fetchProblems=async()=>{
        try{
            setLoading(true);
            const {data}=await axiosClient.get('/problem/getallproblem');
            setProblems(data);

        }catch(error){
            setError('Failed to fetch problems');
            console.error(error);

        }finally{
            setLoading(false);
        }
    };

    const handleDelete=async(id)=>{
        if(!window.confirm('Are you sure you want to delete this problem')) return;

        try{
            await axiosClient.delete(`/problem/delete/${id}`);
            setProblems(problems.filter(problem=>problem._id!==id));
        }
        catch(error){
            setError('Failed to delete problem');
            console.error(error);
        }
        
    };

    if(loading){
        return(
            <div className="flex justify-center items-centerh-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if(error){
        return (
            <div className="alert alert-error shadow-lg my-4">
                <div>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Delete Problems</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th className="w-1/12">#</th>
                            <th className="w-4/12">Title</th>
                            <th className="w-2/12">Difficulty</th>
                            <th className="w-2/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem,index)=>(
                            <tr key={problem._id}>
                                <th>{index+1}</th>
                                <td>{problem.title}</td>
                                <td>
                                    <span className={`badge ${
                                        problem.difficulty==='easy'
                                        ? 'badge-success'
                                        :problem.difficulty==='medium'
                                        ? 'badge-warning'
                                        :'badge-error'
                                    }`}>
                                        {problem.difficulty}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex space-x-2">
                                        <button 
                                        onClick={()=>handleDelete(problem._id)}
                                        className="btn btn-sm btn-error">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default AdminDelete;