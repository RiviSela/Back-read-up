using Data.Models.TextSplit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VayikraApi.Business.BL.TextSplit
{
    public static class TitleSplitter
    {
            public static string FindTitle(IReadOnlyList<TextAnnotationEntity> annotations)
            {
                if (annotations == null || annotations.Count <= 1) 
                {
                    return null;
                }

                var likelyTitleCandidates = annotations.Skip(1)
                    .Where(annotation => annotation.BoundingPoly != null && annotation.BoundingPoly.Vertices.Any())
                    .Select(annotation => new
                    {
                        Text = annotation.Description,
                        Area = CalculateArea(annotation.BoundingPoly.Vertices.ToList())
                    })
                    .Where(x => x.Area > 0) 
                    .OrderByDescending(x => x.Area) 
                    .Take(5)
                    .ToList();

                if (!likelyTitleCandidates.Any())
                {
                    return null;
                }

                return likelyTitleCandidates.FirstOrDefault()?.Text;
            }

            private static double CalculateArea(List<VertexEntity> vertices)
            {
                if (vertices.Count < 4) 
                {
                    return 0;
                }

                var width = Math.Abs(vertices[1].X - vertices[0].X);
                var height = Math.Abs(vertices[2].Y - vertices[1].Y);
                return width * height;
            }
        }
}
