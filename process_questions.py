#!/usr/bin/env python3
import json
import os

# List of question IDs to remove
questions_to_remove = {
    # Too Narrow/Specialized (15 questions)
    'q086', 'q099', 'q102', 'q109', 'q113', 'q115', 'q117', 'q195', 'q253', 
    'q097', 'q105', 'q107', 'q119', 'q120', 'q236',
    # Edge Cases (12 questions)
    'q098', 'q112', 'q165', 'q166', 'q196', 'q198', 'q200', 'q201', 'q111', 
    'q229', 'q349', 'q239',
    # Duplicate/Similar (8 questions)
    'q088', 'q095', 'q104', 'q114', 'q118', 'q168', 'q192', 'q203',
    # Pure Memorization (5 questions)
    'q092', 'q096', 'q224', 'q234', 'q272'
}

def process_question_file(input_file, output_file):
    """Process a question file to remove specified questions and renumber remaining ones."""
    
    # Read the input file
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Filter out questions to remove
    original_count = len(data['questions'])
    filtered_questions = [q for q in data['questions'] if q['id'] not in questions_to_remove]
    removed_count = original_count - len(filtered_questions)
    
    # Renumber the remaining questions
    current_id = 1
    for question in filtered_questions:
        question['id'] = f"q{current_id:03d}"
        current_id += 1
    
    # Update the data structure
    data['questions'] = filtered_questions
    
    # Write the output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Processed {input_file}: removed {removed_count} questions, {len(filtered_questions)} remaining")
    return removed_count, len(filtered_questions)

def main():
    """Process all question files."""
    base_dir = "/Users/dread/Documents/Island-Bitcoin/Island Bitcoin/bitcoin-trivia/data"
    
    files_to_process = [
        'questions-levels-1-3.json',
        'questions-levels-4-7.json',
        'questions-levels-8-14.json',
        'questions-levels-15-21.json',
        'questions-levels-22-30.json'
    ]
    
    total_removed = 0
    total_remaining = 0
    
    # Process each file
    for filename in files_to_process:
        input_path = os.path.join(base_dir, filename)
        output_path = input_path  # Overwrite the original file
        
        if os.path.exists(input_path):
            removed, remaining = process_question_file(input_path, output_path)
            total_removed += removed
            total_remaining += remaining
        else:
            print(f"File not found: {input_path}")
    
    print(f"\nSummary:")
    print(f"Total questions removed: {total_removed}")
    print(f"Total questions remaining: {total_remaining}")
    print(f"Original total: {total_removed + total_remaining}")

if __name__ == "__main__":
    main()