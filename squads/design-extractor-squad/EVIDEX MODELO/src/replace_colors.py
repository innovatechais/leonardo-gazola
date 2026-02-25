#!/usr/bin/env python3
import os
import re

# Mapeamento de cores laranja para verde
replacements = [
    # Gradientes
    ('from-orange-500 to-yellow-500', 'from-green-500 to-lime-400'),
    ('from-orange-600 to-yellow-600', 'from-green-600 to-lime-500'),
    ('from-orange-400 to-yellow-400', 'from-green-400 to-lime-300'),
    
    # Cores de texto
    ('text-orange-700', 'text-green-700'),
    ('text-orange-600', 'text-green-600'),
    ('text-orange-500', 'text-green-500'),
    ('text-orange-400', 'text-green-400'),
    ('text-orange-300', 'text-green-300'),
    
    # Dark mode
    ('dark:text-orange-500', 'dark:text-green-500'),
    ('dark:text-orange-400', 'dark:text-green-400'),
    ('dark:text-orange-300', 'dark:text-green-300'),
    
    # Backgrounds
    ('bg-orange-950', 'bg-green-950'),
    ('bg-orange-100', 'bg-green-100'),
    ('dark:bg-orange-950', 'dark:bg-green-950'),
    
    # Borders
    ('border-orange-500', 'border-green-500'),
]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        for old, new in replacements:
            content = content.replace(old, new)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Erro ao processar {filepath}: {e}")
        return False

def process_directory(directory):
    modified_files = []
    
    for root, dirs, files in os.walk(directory):
        # Ignorar node_modules e outras pastas
        if 'node_modules' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(root, file)
                if replace_in_file(filepath):
                    modified_files.append(filepath)
    
    return modified_files

if __name__ == '__main__':
    # Processar diretório de componentes
    modified = process_directory('/components')
    
    print(f"\n✅ Arquivos modificados: {len(modified)}")
    for f in modified:
        print(f"  - {f}")
