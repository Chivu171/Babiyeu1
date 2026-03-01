import { useState } from 'react';
import { FoodSelector } from './components/FoodSelector';

export default function App() {
  return (
    <div className="size-full bg-gradient-to-br from-pink-50 to-purple-50">
      <FoodSelector />
    </div>
  );
}
