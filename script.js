const grid = document.getElementsByClassName(`grid-item`)
const breeze = `<img src="image/breeze.png" style="height:30px; width:30px">`
const stink = `<img src="image/stink.png" style="height:50%; width:50%">`
const monster = {
  monster: `<img src="image/monster.png" style="height:70%; width:70%">`,
  stink: `<img src="image/stink.png" style="height:70%; width:70%">`,
  locale: undefined,
}
const hero = {
  up:    `<img src="image/kngup.png" style="height:80%; width:80%">`,
  down:  `<img src="image/kngdown.png" style="height:80%; width:80%">`,
  right: `<img src="image/kngright.png" style="height:80%; width:80%">`,
  left:  `<img src="image/kngleft.png" style="height:80%; width:80%">`,
  locale: undefined,
  direction: undefined,
}

setInitialCanvas = () => {
  setDoor()
  setHole()
  setHole()
  setHole()
  setmonster()
}

const clearCanvas = () => {
  Array.prototype.map.call(grid, item => item.innerHTML = ``)
  Array.prototype.map.call(grid, item => item.classList.remove('hole', 'door', 'treasure'))
}

const setDoor = () => {
  const n = Math.floor(Math.random() * 16)
  if ([5, 6, 9, 10].includes(n))
    setDoor()
  else{
    grid[n].classList.add('door')
    setHero(n)
  }
}

const setTreasure = () => {
  const n = Math.floor(Math.random() * 16)
  if (grid[n].classList.contains('door') || grid[n].classList.contains('hole'))
    setTreasure()
  else
    grid[n].classList.add('treasure')
}

const setHole = () => {
  const n = Math.floor(Math.random() * 16)
  if (grid[n].classList.contains('door') || grid[n].classList.contains('hole') || grid[n].classList.contains('treasure'))
    setHole()
  else{
    grid[n].classList.add('hole')
    setBreeze(n)
  }
}

const setmonster = () => {
  const n = Math.floor(Math.random() * 16)
  if (grid[n].classList.contains('door'))
    setmonster()
  else {
    grid[n].innerHTML = grid[n].innerHTML + monster.monster
    setTimeout(function(){grid[n].innerHTML = ` `}, 1000)        
    monster.locale = n
    setStink(n)
  }
}

const setHero = n => {
  grid[n].innerHTML = grid[n].innerHTML + hero.down
  hero.locale = n
  setTreasure()
}

const setStink = n => {
  if ( ![3, 7, 11, 15].includes(n) )
    {
      grid[n+1].innerHTML = grid[n+1].innerHTML + monster.stink 
      setTimeout(function(){grid[n+1].innerHTML = ` `}, 1000)        
    }
  if ( ![0, 4, 8, 12].includes(n) )
  {
    grid[n-1].innerHTML = grid[n-1].innerHTML + monster.stink
    setTimeout(function(){grid[n-1].innerHTML = ` `}, 1000)        
    
  }
    
  if ( ![0, 1, 2, 3].includes(n) )
  {
    grid[n-4].innerHTML = grid[n-4].innerHTML + monster.stink
    setTimeout(function(){grid[n-4].innerHTML = ` `}, 1000)        
  }
    
  if ( ![12, 13, 14, 15].includes(n) )
  {
    grid[n+4].innerHTML = grid[n+4].innerHTML + monster.stink
    setTimeout(function(){grid[n+4].innerHTML = ` `}, 1000)        
  }
 
  
}

const moveMonster = n =>{
  if ( ![3, 7, 11, 15].includes(n) )
    {
      grid[n+1].innerHTML = grid[n+1].innerHTML + monster.monster
      setTimeout(function(){grid[n].innerHTML = ` `}, 1000)  
    }
  if ( ![0, 4, 8, 12].includes(n) )
    {
      grid[n+1].innerHTML = grid[n-1].innerHTML + monster.monster
      setTimeout(function(){grid[n-1].innerHTML = ` `}, 1000)  
    }
  if ( ![0, 1, 2, 3].includes(n) )
    {
      grid[n-4].innerHTML = grid[n-4].innerHTML + monster.monster
      setTimeout(function(){grid[n-4].innerHTML = ` `}, 1000)  
    }
  if ( ![12, 13, 14, 15].includes(n) )
    {
      grid[n+4].innerHTML = grid[n+4].innerHTML + monster.monster
      setTimeout(function(){grid[n+4].innerHTML = ` `}, 1000)  
    }

}


const setBreeze = n => {
  // if ( ![3, 7, 11, 15].includes('hole') )
  //   grid[n+1].innerHTML = grid[n+1].innerHTML + breeze
  // if ( ![0, 4, 8, 12].includes('hole') )
  //   grid[n-1].innerHTML = grid[n-1].innerHTML + breeze
  // if ( ![0, 1, 2, 3].includes('hole') )
  //   grid[n-4].innerHTML = grid[n-4].innerHTML + breeze
  // if ( ![12, 13, 14, 15].includes('hole') )
  //   grid[n+4].innerHTML = grid[n+4].innerHTML + breeze

}



// Buttons
const btnGo = document.getElementById(`btnGo`)
btnGo.addEventListener(`click`, () => {clearCanvas(); setInitialCanvas()})

const btnRestart = document.getElementById(`btnRestart`)
btnRestart.addEventListener(`click`, () => clearCanvas())
