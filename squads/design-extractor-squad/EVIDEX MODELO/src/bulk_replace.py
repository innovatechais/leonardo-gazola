#!/usr/bin/env python3
# Script para substituir todas as cores laranja por verde

import os

def replace_colors_in_file(filepath):
    """Substitui todas as cores laranja por verde em um arquivo"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fazer todas as substituições
        original = content
        content = content.replace('text-orange-500', 'text-green-500')
        content = content.replace('text-orange-600', 'text-green-600')
        content = content.replace('text-orange-700', 'text-green-700')
        content = content.replace('text-orange-400', 'text-green-400')
        content = content.replace('text-orange-300', 'text-green-300')
        
        # Dark mode
        content = content.replace('dark:text-orange-500', 'dark:text-green-500')
        content = content.replace('dark:text-orange-400', 'dark:text-green-400')
        content = content.replace('dark:text-orange-300', 'dark:text-green-300')
        
        # Hover
        content = content.replace('hover:text-orange-600', 'hover:text-green-600')
        content = content.replace('dark:hover:text-orange-400', 'dark:hover:text-green-400')
        
        # Background
        content = content.replace('bg-orange-100', 'bg-green-100')
        content = content.replace('bg-orange-950', 'bg-green-950')
        content = content.replace('dark:bg-orange-950', 'dark:bg-green-950')
        
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Erro: {filepath}: {e}")
        return False

# Processar arquivos específicos
files_to_process = [
    '/components/institutional-v2/PricingClean.tsx',
    '/components/sales-v2/PricingClean.tsx',
]

for filepath in files_to_process:
    if replace_colors_in_file(filepath):
        print(f"✓ {filepath}")
    else:
        print(f"- {filepath} (sem mudanças)")
