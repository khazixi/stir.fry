// import './style.css'

import Chicken from '/chicken.svg'
import Cow from '/cow.svg'
import Tofu from '/tofu.svg'
import NoMeat from '/no-meat.svg'

import Spicy from '/spicy.svg'
import NoSpicy from '/no-spicy.svg'

import WhiteNoodle from '/white-noodle.svg'
import YellowNoodle from '/yellow-noodle.svg'
import NoNoodle from '/no-noodle.svg'

addEventListener('popstate', () => {
  const params = new URLSearchParams(document.location.search)

  if (params.size === 0) renderRoot()
  else renderItems(params)
})

/** @param {SubmitEvent} event */
function handleSubmission(event) {
  const fd = new FormData(event.target)
  const params = new URLSearchParams(fd)

  renderItems(params)
  history.pushState({}, "", '?' + params.toString())

  event.preventDefault()
}

/** @param {URLSearchParams} params */
function renderItems(params) {
  const app = document.querySelector('#app')

  let noodleImg
  let meatImg

  const noodle = params.get('noodle')
  const spicy = (params.get('spicy') === 'on') ? "spicy" : "no spicy"
  const spicyImg = (params.get('spicy') === 'on') ? Spicy : NoSpicy
  const meat = params.get('meat')

  if (noodle === 'white') {
    noodleImg = WhiteNoodle
  } else if (noodle === 'yellow') {
    noodleImg = YellowNoodle
  } else {
    noodleImg = NoNoodle
  }

  if (meat === 'chicken') {
    meatImg = Chicken
  } else if (meat === 'beef') {
    meatImg = Cow
  } else {
    meatImg = NoMeat
  }

  app.innerHTML = `<h1>Options</h1>`

  app.insertAdjacentHTML('beforeend', `<img src="${meatImg}" alt="Some Meat">`)
  app.insertAdjacentHTML('beforeend', `<img src="${spicyImg}" alt="${spicy}">`)
  app.insertAdjacentHTML('beforeend', `<img src="${noodleImg}" alt="Some Noodle">`)
}

function renderRoot() {
  document.querySelector('#app').innerHTML = `
    <form>
      <h1> Stir.fry </h1>
      <fieldset>
        <legend>Noodles</legend>
        <input type="radio" name="noodle" value="noodleless" >
        <label for="noodleless"> No Noodles </label>
        <br>
        <input type="radio" name="noodle" value="white">
        <label for="white"> White Noodles </label>
        <br>
        <input type="radio" name="noodle" value="yellow" >
        <label for="yellow"> Lo Mein Noodles </label>
      </fieldset>

      <fieldset>
        <legend> Spicy </legend>
        <input type="checkbox" name="spicy">
        <label for="spicy"> Spicy </label>
        <br>
      </fieldset>

      <fieldset>
        <legend> Meat </legend>
        <input type="radio" name="meat" value="meatless" >
        <label for="meatless"> No Meat </label>
        <br>
        <input type="radio" name="meat" value="tofu">
        <label for="tofu"> Tofu </label>
        <br>
        <input type="radio" name="meat" value="chicken">
        <label for="chicken"> Chicken </label>
        <br>
        <input type="radio" name="meat" value="beef" >
        <label for="beef"> Beef </label>
      </fieldset>

      <button type="submit"> Submit </button>
    </form>
  `

  document.querySelector('form').addEventListener('submit', handleSubmission)

  history.replaceState({}, "", "/")
}

function router() {
  const params = new URLSearchParams(document.location.search)

  if (params.size === 0) renderRoot()
  else renderItems(params)
}

router()
