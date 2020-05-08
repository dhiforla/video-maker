const readline = require ('readline-sync')

function start(){
  const content = {}
  
  content.searchTerm = askAndReturnSearchTerm()
  content.prefix = askAndReturnPreFix()
  
  function askAndReturnSearchTerm(){
    return readline.question('Type a Wikipedia search term: ')
  }
  
  function askAndReturnPreFix(){
    const prefixes = ['Who is', 'What is', 'The Historia of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    
    console.log(selectedPrefixIndex)
  }
  
   console.log(content)
 }
 
 start()
