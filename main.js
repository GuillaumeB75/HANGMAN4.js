
const fs = require('fs')
const { randomInt } = require('crypto')
const readlineSync = require('readline-sync')
const chalk = require('chalk');
const { hangman } = require('./hangman.js')
const chalkAnimation = require('chalk-animation'); // à utiliser sous conditions

const dict = fs.readFileSync('./dict.txt', 'utf-8')
const word = dict.split('\n') 

const n = randomInt(0, word.length) 
const secretWord = Array(word[n].length).fill('_') 

let count = 7



console.log(chalk.blue.bold(`Welcome to this Hangman Game - Among The Most Special Military Unit and Secret Agencies Around the World. Choose the right letter carrefully`))

  
  while (secretWord.includes('_')) {
    console.log(secretWord.join(" "))
    let question = readlineSync.question(chalk.yellow(`Guess a letter: `))
    
    if (word[n].includes(question)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (word[n][i] === question) {
          secretWord[i] = question
        }
      }
    }
    
    if (!word[n].includes(question)) {
      count--
      console.log(chalk.whiteBright(`This letter ${question} isn't correct. You have ${count} tries left ${hangman[count]}`))
    }
    
    if (!word[n].includes(question) && count <= 0) {
      console.log(chalk.blueBright(`You failed ! The secret word was ${chalk.yellow(word[n])}`))
      process.exit(1)
      
    }
    
    if (!secretWord.includes('_')) {
      console.log(chalk.greenBright.bold(`Good job recruit!! The secret word was ${chalk.yellow(word[n])}`))
      /*chalkAnimation.rainbow(`Good job recruit!! The secret word was ${(word[n])}`)*/   // Pour lancer la réponse FINALE avec l'animation rainbow. attention le TERMINAL ne répond plus après .
    }
  }
  
