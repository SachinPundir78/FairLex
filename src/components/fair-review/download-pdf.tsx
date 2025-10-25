"use client";

import { Button } from "@/src/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf/dist/polyfills.es.js";

type DownloadPDFProps = {
  review: {
    id: string;
    title: string;
    content: string;
    featuredImage?: string;
    rating?: number;
    author: { name: string; imageUrl: string | null };
    createdAt: Date;
    _count?: { likes: number; comments: number };
  };
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  fullWidth?: boolean;
};

export default function DownloadPDF({
  review,
  variant = "outline",
  size = "sm",
  className = "",
  fullWidth = true,
}: DownloadPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let y = margin;

      const checkPageBreak = (height: number) => {
        if (y + height > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      // --- Featured Image ---
      if (review.featuredImage) {
        try {
          const imgProps = await pdf.getImageProperties(review.featuredImage);
          const imgWidth = contentWidth;
          const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
          checkPageBreak(imgHeight);
          pdf.addImage(
            review.featuredImage,
            "JPEG",
            margin,
            y,
            imgWidth,
            imgHeight
          );
          y += imgHeight + 5;
        } catch {
          console.warn("Failed to load image");
        }
      }

      // --- Header Badge ---
      pdf.setFillColor(234, 179, 8);
      pdf.roundedRect(margin, y, 35, 7, 2, 2, "F");
      pdf.setFontSize(9);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("serif", "bold");
      pdf.text("⭐ REVIEW", margin + 2, y + 6.5);
      y += 20;

      // --- Title ---
      pdf.setFontSize(18);
      pdf.setFont("serif", "bold");
      pdf.setTextColor(17, 24, 39);
      const titleLines = pdf.splitTextToSize(review.title, contentWidth);
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 8;
      });
      y += 4;

      // --- Author and Date ---
      pdf.setFontSize(11);
      pdf.setFont("serif", "bold");
      pdf.setTextColor(55, 65, 81);
      pdf.text("Author:", margin, y);
      pdf.setFont("serif", "normal");
      pdf.text(review.author.name, margin + 20, y);
      y += 6;

      pdf.setFont("serif", "bold");
      pdf.text("Date:", margin, y);
      pdf.setFont("serif", "normal");
      pdf.text(
        new Date(review.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        margin + 20,
        y
      );
      y += 8;

      // --- Divider ---
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 6;

      // --- Parse and Format Content ---
      pdf.setFontSize(12);
      pdf.setTextColor(33, 33, 33);
      pdf.setFont("serif", "normal");

      // Clean text (remove extra spaces & HTML)
      const rawText = review.content
        .replace(/<[^>]*>/g, "")
        .replace(/\r?\n|\r/g, "\n")
        .trim();

      const lines = rawText.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        const trimmed = line.trim();

        // Detect headings (like INTRODUCTION:, TABLE OF CONTENT, etc.)
        const isHeading =
          /^[A-Z\s]+:$/.test(trimmed) ||
          /^[A-Z\s]+$/.test(trimmed) ||
          /^[A-Z].*:$/.test(trimmed);

        // Detect numbered headings (1., 1.1., etc.)
        const isNumbered = /^\d+(\.\d+)*\s/.test(trimmed);

        // Apply formatting
        if (isHeading) {
          pdf.setFont("serif", "bold");
          pdf.setFontSize(14);
          pdf.setTextColor(20, 20, 20);
          checkPageBreak(10);
          pdf.text(trimmed.replace(/:$/, ""), margin, y);
          y += 8;
          pdf.setFont("serif", "normal");
          pdf.setFontSize(12);
          pdf.setTextColor(55, 65, 81);
          y += 2;
        } else if (isNumbered) {
          pdf.setFont("serif", "bold");
          pdf.setTextColor(40, 40, 40);
          const [numPart, ...rest] = trimmed.split(" ");
          const remaining = rest.join(" ");
          checkPageBreak(7);
          pdf.text(numPart, margin, y);
          pdf.setFont("serif", "normal");
          pdf.text(remaining, margin + 10, y);
          y += 7;
        } else {
          const paragraphLines = pdf.splitTextToSize(trimmed, contentWidth - 5);
          pdf.setFont("serif", "normal");
          pdf.setTextColor(55, 65, 81);
          paragraphLines.forEach((pl: string) => {
            checkPageBreak(7);
            pdf.text(pl, margin + 3, y);
            y += 7;
          });
          y += 3;
        }
      }

      // --- Footer ---
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(130, 130, 130);
        pdf.text(
          `Downloaded from FairReview • ${new Date().toLocaleDateString()}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: "center" }
        );
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pageWidth - margin,
          pageHeight - 10,
          {
            align: "right",
          }
        );
      }

      const fileName = `${review.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .substring(0, 50)}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${
        fullWidth ? "w-full" : ""
      } bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white border-0 font-semibold ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        generatePDF();
      }}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  );
}
