using System.Collections.Generic;
using System.Linq;

namespace VayikraApi.Business.BL.TextSplit
{
    public class TextSplitResult
    {
        public List<string> SplittedStrings { get; set; }

        public override string ToString()
        {
            return string.Join("\r\n", SplittedStrings);
        }

        public static string ListOfListsToString(List<List<string>> listOfLists)
        {
            var lines = listOfLists.Select(innerList => string.Join(" ", innerList));

            string result = string.Join("\n", lines);

            return result;
        }

    }
}