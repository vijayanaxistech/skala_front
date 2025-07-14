import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Image1 from '../../public/assets/icons/gold.png';
import Image2 from '../../public/assets/icons/money.png';
import Image3 from '../../public/assets/icons/coin.png';

const EasyGoldScheme = () => {
    const schemes = [
        {
            icon: Image1,
            title: 'Digi Gold',
            description: 'Digital Gold benefits',
            link: '/digi-gold', // Add appropriate routes
        },
        {
            icon: Image3,
            title: 'Book My Gold',
            description: 'Book My Gold Benefits and How it works?',
            link: '/book-my-gold',
        },
        {
            icon: Image2,
            title: 'Monthly Saving Scheme',
            description: 'Golden treasure',
            link: '/monthly-saving-scheme',
        },
    ];

    return (
        <div className="bg-color py-5 text-center px-3 px-md-3">
            <div className="d-flex justify-content-center align-items-center ">
                <div className="custom-heading-wrapper d-flex align-items-center mb-5">
                    <h3 className="m-0 custom-heading text-wrap me-3 text-center">
                        <span className="fraunces">
                            Easy Steps to <span className="text-red fraunces">Own Gold </span>
                        </span>

                    </h3>
                </div>
            </div>

            <div className="row mt-4">
                {schemes.map((item, idx) => (
                    <div key={idx} className="col-12 col-sm-6 col-md-4 ">
                        <div className="d-flex flex-column align-items-center px-3">
                            <Link href={item.link} className="text-decoration-none">
                                <div className="rounded-4 iconbox d-flex justify-content-center align-items-center mb-3">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={40}
                                        height={40}
                                        className="iconbox-image"
                                    />
                                </div>
                            </Link>
                            <h5 className="heading-extension text-red  fraunces mt-3">{item.title}</h5>
                            <p className="text-muted mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EasyGoldScheme;
