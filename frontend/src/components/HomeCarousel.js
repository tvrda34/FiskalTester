
import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import welcomes from '../welcomes'

function HomeCarousel() {

    return (
            <Carousel pause='hover' className='bg-dark'>
                {welcomes.map(welcome => (
                    <Carousel.Item key={welcome._id}> 
                            <Image src={welcome.image} alt={welcome.name} fluid/>
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{welcome.name}</h4>
                            </Carousel.Caption>
                            
                    </Carousel.Item>
                ))}
            </Carousel>
    )
}

export default HomeCarousel