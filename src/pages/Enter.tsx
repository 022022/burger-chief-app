import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppDispatch } from '../app/hooks';
import { setUserName } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export function Enter() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    function enter() {
        dispatch(setUserName(name));
        navigate('/orders', { replace: true });
    }

    return (
		<div className='d-flex flex-column justify-content-center align-items-center w-100 h-100 position-absolute p-3'>
			<img
				alt='Логотип бургерной Раз-два-три бургер'
				src='images/logo123burger.svg'
				style={{
					height: 36,
					width: 230,
					filter: 'brightness(75%)',
				}}
			/>

			<p className='w-50 text-center py-4'>
				Вход в приложение пока в демо-режиме, поэтому просто введите
				любое имя. Изменения заказов не будут отправлены
			</p>

			<Form.Group className='mb-3' controlId='code'>
				<Form.Label>Имя (2-10 символов)</Form.Label>
				<Form.Control
					autoComplete='off'
					size='lg'
					type='text'
                    value={name}
                    onChange={(e)=> {
                        if(e.target.value.length <= 10){
                            setName(e.target.value)
                        }
                    }}
				/>
			</Form.Group>

			<Button size='lg' className='btn btn-primary' type='submit'
                disabled={name.length < 2} onClick={enter}
            >
				Войти
			</Button>
		</div>
	);
}