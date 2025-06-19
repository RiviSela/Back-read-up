using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class PuncuationSplitter
    {
        public static List<List<string>> Split(List<string> textToSplit)
        {
            ReadUpBooksContext context = new ReadUpBooksContext();

            List<SplitRules> splitRules = context.SplitRules.Where(rule => rule.Key == "punctuation").ToList();

            string punctuations = string.Join("", splitRules.Select(r => r.Value));

            List<List<string>> listOfLists = new List<List<string>>();
            List<string> currentList = new List<string>();

            foreach (var word in textToSplit)
            {
                currentList.Add(word);

                string wordForPunctuationCheck = word.TrimEnd('\"');


                if (wordForPunctuationCheck.Any() && punctuations.Contains(wordForPunctuationCheck.Last()))
                {
                    listOfLists.Add(new List<string>(currentList));
                    currentList = new List<string>(); 
                }
            }

            if (currentList.Any())
            {
                listOfLists.Add(currentList);
            }

            return listOfLists;
        }

    }
}
