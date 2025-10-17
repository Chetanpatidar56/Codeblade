import React,{ useState } from 'react';
import {Plus,Edit,Trash2, Video} from 'lucide-react';
import { NavLink } from 'react-router-dom';


function Admin(){
    const[selectedOption,setSelectedOption]=useState(null);


    const adminOptions=[
        {
            id:'create',
            title:'Create Problem',
            description:'Add a new coding problem to the platfrom',
            icon:Plus,
            color:'btn-success',
            bgColor:'bg-success/10',
            route:'/admin/create'
        },
        {
            id:'update',
            title:'Update Problem',
            description:'Edit the existing problem',
            icon:Edit,
            color:'btn-warning',
            bgColor:'bg-warning/10',
            route:'/admin/update'
        },
        {
            id:'delete',
            title:'Delete Problem',
            description:'Remove problem from the platform',
            icon:Trash2,
            color:'btn-error',
            bgColor:'bg-error/10',
            route:'/admin/delete'
        },
        {
            id:'video',
            title:'Video Problem',
            description:'Upload and Delete Videos',
            icon:Video,
            color:'btn-success',
            bgColor:'bg-success/10',
            route:'/admin/video'
        }
    ];
    

    return(
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                {/*header*/}
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold'>
                        Admin Panel
                    </h1>
                </div>

                 {/*placing cards*/}
                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                    {adminOptions.map((option)=>{
                        const Iconcomponent=option.icon;
                        return(
                            <div 
                            key={option.id}
                            className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform-border'>
                                <div className='card-body items-center text-center p-8'>
                                    <div className={`${option.bgColor} p-4 rounded-full mb-4`}>
                                        <Iconcomponent size={32} className='text-base-content'/>
                                    </div>
                                    <h2 className='card-title text-xl mb-2'>
                                        {option.title}

                                    </h2>
                                    <p className='text-base-content/70 mb-6'>
                                    {option.description}
                                    </p>
                                    <div className='card-actions'>
                                        <div className='card-actions'>
                                            <NavLink to={option.route} className={`btn ${option.color} btn-wide`}>
                                                {option.title}
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                 </div>
                 {selectedOption && (
                    <div className='mt-8 max-w-2xl mx-auto'>
                        <div className='alert alert-info'>
                            <div className='flex items-center gap-2'>
                                <setSelectedOption.icon size={20}/>
                                <span>
                                    You Selected:<strong>{selectedOption.title}</strong>
                                    <br></br>
                                    <small>In your app, this would navigate to:{selectedOption.route}</small>
                                </span>
                            </div>
                        </div>
                    </div>
                 )}


            </div>
        </div>
    )
}
export default Admin;