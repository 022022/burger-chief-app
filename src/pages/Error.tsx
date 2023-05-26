export function Error() {
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

			<p className='text-muted fs-1'>:(</p>
			<p className='w-50 text-center'>
				У нас на сайте временные неполадки, зайдите, пожалуйста, попозже
			</p>
		</div>
	);
}