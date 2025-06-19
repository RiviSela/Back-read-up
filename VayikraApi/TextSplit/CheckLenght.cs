using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class CheckLenght
    {
        public static List<List<string>> Split(List<List<string>> listOfLists)
        {
            List<List<string>> processedLists = new List<List<string>>();

            foreach (var list in listOfLists)
            {
                if (list.Count >= 7)
                {
                    processedLists.Add(list.Take(5).ToList());

                    processedLists.Add(list.Skip(5).ToList());
                }
                else
                {
                    processedLists.Add(list);
                }
            }


            return processedLists;

        }
    }
}
