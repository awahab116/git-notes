import React, { FC } from 'react';
import Button from '../../components/ui/button';
import Counter from '../../features/counter/counter';
import Card from '../../components/card';
import GistsGrid from '../../features/gistsGrid/gistsGrid';

let buttonText = 'Click';

const Home: FC = () => {
  return (
    // <header
    // // style={{
    // //   backgroundColor: 'white',
    // //   display: 'flex',
    // //   flexDirection: 'column',
    // //   alignItems: 'center',
    // //   justifyContent: 'center',
    // //   fontSize: 'calc(10px + 2vmin)',
    // //   color: '#282c34',
    // // }}
    // >
    //   <p>Welcome To React!</p>
    //   {/* <Button text={buttonText} onClick={() => alert('Hello 👋')} />
    //   <Counter /> */}
    //   {/* <Card /> */}
    //   <GistsGrid />
    // </header>

    <div>
      <GistsGrid />
    </div>
  );
};
export default Home;
