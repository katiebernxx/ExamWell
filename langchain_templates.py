import os
# from langchain.llms import OpenAI
from langchain.schema import HumanMessage, SystemMessage, AIMessage
from langchain.prompts import PromptTemplate
import configparser
from langchain_openai import OpenAI
from langchain.chat_models import ChatOpenAI


# SETTING UP THE LLMS
# Generator creates the problem
# Fact checker assesses the problem and provides feedback
# generator_llm = OpenAI(model_name="o1-mini", openai_api_key=openai_api_key)
generator_llm = ChatOpenAI(model="o1-mini", openai_api_key=openai_api_key)




# # PROMPT ENGINEERING

# Prompt template for generator
# generator_template = """
# Give me an exam problem based on the curriculum of {subject} about {topic}.
# It should be a {type_of} questions and of level {difficulty}. Additional parameters that should be used include: {additionals} (ignore if blank)

# Respond with just the exam problem. Do not provide an answer.
# """

alg2_prompt = """
<content>
Generate a single math problem for a high school Algebra 2 math teacher to use in an exam for their students based on the given parameters. Ensure that the problem adheres to all specified constraints and educational objectives, is solvable, and factually correct.

The problem should be about {topic} in Algebra 2. With difficulty levels ranging from 1 to 4, it should be of difficulty level {difficulty}. 

It should achieve the Blooms Taxonomy Educational Objective of {blooms}. Blooms Taxonomy defines six hierarchical levels of cognitive learning, each progressively building on the previous level. Remember focuses on recalling facts and basic concepts, laying the foundation for all higher-order thinking. Understand involves grasping the meaning of information, interpreting it, and expressing it in one’s own words. Apply enables students to use learned knowledge in practical or new contexts, demonstrating the ability to operationalize concepts. Analyze emphasizes breaking down complex information, understanding relationships, and drawing insights by connecting parts to the whole. Evaluate requires making judgments about information or concepts based on set criteria, defending or critiquing their validity. Finally, Create involves synthesizing knowledge to produce something new and meaningful, such as innovative solutions or tangible outputs, demonstrating the pinnacle of cognitive mastery.

It should be a {type}.
It should use {diversity}.
This is a {calculator} problem. This means that more complicated decimal calculations are okay to use if needed.
When solving this problem, it should involve {steps}. This means that a student must go through more rounds of calculations/steps to achieve the final answer. The problem is more complicated.

Extra notes on this problem include:{notes}. Take this into account when creating the problem.

<\\content>

<examples>
An example of a Level 2 difficulty word problem for the topic of solving a system of equations in Algebra 2 would be:

Write a system of equations to describe the situation below, solve using substitution, and fill in the blanks.

Steve works in the shipping department of a toy manufacturer. Toy cars weigh 5 pounds apiece and are shipped in a container that weighs 20 pounds when empty. Toy trucks, which weigh 6 pounds apiece, are shipped in a container weighing 19 pounds. When packed with toys and ready for shipment, both kinds of containers have the same number of toys and the same weight. What is the weight of each container? What is the number of toys?

An example of a Level 2 difficulty level problem for evaluating polynomials with synthetic division is:
If f(t)=23t2 – 35t –6, use synthetic division to find f(2).

Examples of Blooms Taxonomy Educational Objectives in Algebra 2 problems:

Knowledge Level (Recall):
"Define the term 'vertex' in a quadratic function."
"List the steps involved in completing the square."
"What is the standard form of a quadratic equation?" 
Understanding Level (Explain):
"Explain how the 'a' value in a quadratic equation affects the parabola's shape."
"Describe the relationship between the roots of a quadratic equation and its factored form."
"Interpret the meaning of the slope and y-intercept in a linear equation." 
Application Level (Apply):
"Solve the quadratic equation 2x^2 - 5x + 3 = 0 by factoring." 
"Graph the function f(x) = x^2 - 3x + 2." 
"Find the vertex of the parabola y = (x + 1)^2 - 4." 
Analysis Level (Compare & Contrast):
"Compare and contrast the graphs of y = x^2 and y = 2x^2."
"Analyze the differences in solving a quadratic equation by factoring versus using the quadratic formula."
"Given a system of linear equations, explain which method (substitution, elimination) is more efficient to solve it." 
Evaluation Level (Judge):
"Evaluate the effectiveness of using the discriminant to determine the number of real solutions of a quadratic equation." 
"Justify which method (graphing, substitution, elimination) is best to solve a given system of equations based on the problem context." 
"Critique a solution to a quadratic word problem, identifying any potential errors in the reasoning or calculations." 
Creation Level (Synthesize):
"Create a quadratic equation with roots of 2 and -3."
"Design a real-world scenario that could be modeled by a system of linear inequalities."
"Develop a new strategy to solve a given type of quadratic equation, explaining its advantages and limitations." 
<\\examples>

<instructions>
Generate a singular math problem and output ONLY the problem. The content should match the style of the provided examples. Obey all of the specific customizations detailed in the content section of this prompt. Make sure it is original, factual, and solvable. It should be suitable for a teacher to use on an exam for high school Algebra 2 students.
<\\instructions>
"""

generator_prompt = PromptTemplate(
    input_variables=["subject", "topic", "type", "blooms", "difficulty", "diversity", "calculator", "steps", "notes"],
    template=alg2_prompt,
)

# final_prompt = prompt.format(subject='AP Calculus BC', topic="optimization", type="word problem", difficulty="hard")
subject = "Algebra 2"
topic = "System of Equations"
type = "word problem"
blooms = "Apply"
diversity = "historically Black names"
steps = "more steps"
difficulty = "3"
notes = "incorperate the pythagorean theorem"
calculator = "Calculator"

generated_problem_prompt = generator_prompt.format(subject=subject, topic=topic, type=type, difficulty=difficulty, diversity = diversity, calculator = calculator, blooms = blooms, steps = steps, notes = notes)
generated_problem = generator_llm.invoke(generated_problem_prompt)




###################################




def build_Alg2_prompt(
    subject=None,
    topic=None,
    problem_type=None,
    blooms=None,
    difficulty=None,
    diversity=None,
    calculator=None,
    steps=None,
    notes=None
):
    """
    Build a dynamic prompt string based on given parameters 
    """

    prompt_chunks = []

    prompt_chunks.append(
        f"<content>
        Generate a single math problem for a high school Algebra 2 math teacher to use in an exam for their students based on the given parameters. 
        Ensure that the problem adheres to all specified constraints and educational objectives, is solvable, and factually correct.
        The problem should be about {topic} in Algebra 2."
    )
    
    # If difficulty is provided
    if difficulty:
        prompt_chunks.append(f"With difficulty levels ranging from 1 to 4, it should be of difficulty level {difficulty}.")

    # If blooms is provided, then also include the Bloom’s explanation
    if blooms:
        prompt_chunks.append(

            f"It should achieve the Blooms Taxonomy Educational Objective of {blooms}. Blooms Taxonomy defines six hierarchical levels of 
            cognitive learning, each progressively building on the previous level. Remember focuses on recalling facts and basic concepts, 
            laying the foundation for all higher-order thinking. Understand involves grasping the meaning of information, interpreting it, 
            and expressing it in one’s own words. Apply enables students to use learned knowledge in practical or new contexts, demonstrating 
            the ability to operationalize concepts. Analyze emphasizes breaking down complex information, understanding relationships, and drawing 
            insights by connecting parts to the whole. Evaluate requires making judgments about information or concepts based on set criteria, defending 
            or critiquing their validity. Finally, Create involves synthesizing knowledge to produce something new and meaningful, such as innovative solutions 
            or tangible outputs, demonstrating the pinnacle of cognitive mastery."
        )

    # If problem_type is provided
    if problem_type:
        prompt_chunks.append(f"The problem should be a {problem_type}.")

    # If diversity is provided
    if diversity:
        prompt_chunks.append(f"Use {diversity} in the context or naming within the problem.")

    # Calculator handling
    if calculator == "No Calculator":
        prompt_chunks.append(
            "This is a No Calculator problem. Make sure the calculations required are clean and do-able by hand."
        )
    elif calculator == "Calculator":
        prompt_chunks.append(
            "Students are allowed to use calculators, so more complicated decimal calculations are okay to use if needed."
        )

    # Steps handling
    if steps:
        prompt_chunks.append(
            "The problem should require multiple steps in the solution, ensuring that students must go through more rounds "
            "of calculation or reasoning to arrive at the final answer."
        )

    # Extra notes
    if notes:
        prompt_chunks.append(f"Extra notes: {notes}.")

    # Combine all the chunks into one multi-line string (or single line if you prefer).
    final_prompt = "\n".join(prompt_chunks)

    return final_prompt

