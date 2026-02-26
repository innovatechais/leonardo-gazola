export async function GET() {
  const commands = [
    { group: 'Project', commands: ['*project create', '*project list', '*project select', '*project status', '*project switch', '*project clone', '*project archive'] },
    { group: 'Substrate', commands: ['*substrate create', '*substrate list', '*substrate view', '*substrate edit', '*substrate impact', '*substrate import'] },
    { group: 'Block', commands: ['*block create', '*block list', '*block view'] },
    { group: 'Context', commands: ['*context generate', '*context preview'] },
    { group: 'Knowledge', commands: ['*knowledge health', '*knowledge refresh'] },
    { group: 'Squad', commands: ['*squads list', '*squads info', '*make'] },
    { group: 'Campaign', commands: ['*campaign run', '*campaign create', '*campaign list', '*campaign rerun', '*campaign validate'] },
    { group: 'Pipeline', commands: ['*pipeline list', '*pipeline view', '*pipeline create'] },
    { group: 'Capture', commands: ['*capture process', '*capture status', '*capture import'] },
    { group: 'Dashboard', commands: ['*dashboard', '*dashboard weekly'] },
    { group: 'Output', commands: ['*outputs list', '*outputs view'] },
    { group: 'Integration', commands: ['*integrations list', '*integrations connect', '*integrations check'] },
    { group: 'Export', commands: ['*export template', '*export pipeline', '*export squad', '*export method'] },
  ];
  return Response.json(commands);
}
