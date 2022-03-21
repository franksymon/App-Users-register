import React from 'react';

const UsersList = ({users, deletedUser, setSelectedUser}) => {
    return (
        <section id='users'>
            <div className='wrapper-user'>
                {users.map((user)=>
                    <article className='user-conteiner' key={user.id}>
                        <div className='user-info'>
                            <div className='user-name'>
                                <h3>{user.first_name} {user.last_name}</h3> 
                            </div>
                            <p className='email'>{user.email}</p>
                            <p><i className="fa-solid fa-cake-candles"></i> {user.birthday}</p>
                        </div>
                        <div className='user-btn'>
                            <button onClick={() => deletedUser(user.id)}>
                                <i className="fas fa-trash" style={{color: "rgb(239, 83, 80)"}} ></i>
                            </button>
                            <button onClick={() => setSelectedUser(user)}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>
                        </div>
                    </article>
                )}
            </div>
        </section>
    );
};

export default UsersList;

