export function Info() {
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

			<h1 className='text-center'>Руководство</h1>
			<p className='w-50 text-center'>
				Здесь будет размещено справочное руководство для бургер-шефа
			</p>
		</div>
	);
}