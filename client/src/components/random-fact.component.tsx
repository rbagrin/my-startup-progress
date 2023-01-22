import React from 'react'
import { RandomFact } from '../interfaces';

interface RandomFactComponentProps {
  fact: RandomFact | undefined;
}

export const RandomFactComponent = ({ fact }: RandomFactComponentProps) => (
  <div className='bg-blue-300 p-5 my-10'>
    {fact?.text}
  </div>
)
