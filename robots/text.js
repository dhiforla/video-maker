//robo de Texto
const algorithmia = require('algorithmia')
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
const sentenceBoundaryDetection = require('sbd')

async function robot(content){
  await fecthContentFromWikipedia(content)
  sanitizeContente(content)
  breakContentIntoSentences(content)

    async function fecthContentFromWikipedia(content){
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()
        
        
        content.sourceContentOriginal = wikipediaContent.content        
	}

    function sanitizeContente(content){
     const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal)
     const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
     
     content.sourceContentSanitized = withoutDatesInParentheses

     function removeBlankLinesAndMarkdown(text){
        const allLines = text.split('\n')
        
        const withoutBlankLinesAndMarkdown = allLines.filter((line)=>{
            if (line.trim().length === 0 || line.trim().startsWith('='))  {
                return false     
			}
            return true
		})
        return withoutBlankLinesAndMarkdown.join(' ')
	 }
	}
  function removeDatesInParentheses(text){
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ') 
  }
  function breakContentIntoSentences(content){
      content.sentences = []

      const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)
      sentences.forEach((sentences)=>{
        content.sentences.push({
           text: sentences,
           keywords: [],
           images: []
		})
	  })
  }
}

module.exports = robot