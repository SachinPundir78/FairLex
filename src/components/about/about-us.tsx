import React from "react";
import { Scale, BookOpen, Users, FileText, Gavel, Heart } from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-orange-400/10 to-amber-400/10 border-b  mt-16">
        <div className="container mx-auto px-3 py-8 md:py-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                About
              </span>{" "}
              <span className="text-foreground">FairLex</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Making law clear and accessible to everyone
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg p-8 md:p-12 border">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-foreground">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At FairLex, we believe law should be clear and accessible to
              everyone. Our aim is to simplify legal news, updates, and insights
              so readers can stay informed without confusion. We turn complex
              judgments and policies into easy, understandable content for
              students, professionals, and anyone interested in law.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Driven by a passion for fairness and knowledge, FairLex strives to
              create a community that values justice and awareness. Whether
              you&aposre here to follow legal developments or learn something
              new, we&aposre here to help you understand the law.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-foreground">Our </span>
          <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
            Sections
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Constitutional Law Series */}
          <div className="bg-card rounded-xl shadow-lg p-8 border hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center mb-6">
              <Gavel className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Constitutional Law Series
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Detailed commentary on every provision of the Indian Constitution,
              bridging the gap between theoretical understanding and judicial
              interpretation.
            </p>
          </div>

          {/* Family Law Section */}
          <div className="bg-card rounded-xl shadow-lg p-8 border hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Family Law Section
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Unpacks the nuances of various personal laws across religions,
              providing clarity on their evolution, application, and relevance
              in contemporary society.
            </p>
          </div>

          {/* ADR Section */}
          <div className="bg-card rounded-xl shadow-lg p-8 border hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              ADR Section
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Covers both the practical and theoretical aspects of Alternative
              Dispute Resolution, highlighting its growing importance in India
              and its global dimensions.
            </p>
          </div>
        </div>
      </div>

      {/* Fair Review Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-400/10 rounded-2xl shadow-lg p-8 md:p-12 border border-amber-500/20">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-foreground">
                The Fair Review
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our flagship publication, the{" "}
              <span className="font-semibold text-foreground">Fair Review</span>
              , represents the heart of our analytical work. Each issue selects
              two to three of the most contentious and debated legal issues in
              India and presents them through comprehensive, well-researched
              papers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fair Review aims to foster informed debate, encourage scholarly
              dialogue, and offer readers a deeper understanding of how law
              interacts with society&apos most pressing questions.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you&aposre a student, professional, or simply curious about
            law, FairLex is your trusted companion in understanding the legal
            landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
              Explore Articles
            </button>
            <button className="px-8 py-3 border-2 border-amber-500 text-foreground font-semibold rounded-lg hover:bg-amber-500/10 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
